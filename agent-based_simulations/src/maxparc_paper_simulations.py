'''
(C) Copyright 2015–2023 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
'''

# run on cluster by
# sbatch --output=XXX.out --error=XXX.err --qos=medium -n 250 --wrap="srun -n 250 python -u maxparc_paper_simulations.py"
# squeue | grep USERID


from __future__ import print_function, division
from numpy import *
import numpy as np
from numba import njit as njit0
from time import time
from numpy.random import choice, seed
from scipy.optimize import minimize
from pandas import DataFrame
from pylab import figure,plot
from itertools import permutations

# wrap njit to allow for additional arguments:
def njit(*args, **kwargs): return njit0(*args, **kwargs) # not used due to bugs: , fastmath=True) #, parallel=True)

import sh,os
from matplotlib.pyplot import savefig
def printmem(text=""):
    print("MEM:",text,float(sh.awk(sh.ps('u','-p',os.getpid()),'{sum=sum+$6}; END {print sum/1024}')))

set_printoptions(precision=3,suppress=True)

# get parallel rank and initialize time:

time_started = time()

try_mpi = False

if try_mpi:
    try:
        from mpi4py import MPI
        parallelization_rank = MPI.COMM_WORLD.rank
        print(parallelization_rank,"%018.7f"%time_started,"starting as one out of",MPI.COMM_WORLD.size,"jobs")
    except:
        parallelization_rank = 0
        print(parallelization_rank,"%018.7f"%time_started,"starting without MPI")
else:
    import os
    parallelization_rank = os.getpid()

# TODO: read simulation parameters from command line!


##################
### PARAMETERS ###
##################

#case = "PLOTS"
case = "TEST"
results_dir = "~/tmp/"

if case == "PAPER":

    jobname = "2020_03_28_1mio_"
    do_plots = False
    
    # make unique random seed so that parallel jobs are different:
    seed_offset = 0
    
    mcn = 2000 # size of Monte Carlo sample of each node (will be multiplied by two if do_compromises)
    
    nvoterss = 2* (10**linspace(1,3,1000) / 2).astype("int") - 1 # odd numbers log-uniformly distributed from 9 to 999
    noptionss = arange(3,10) 
    
    do_compromises = True 
    umodels = ["unif","BM","GA","QA","LA"]
    BMrs = [2,5,9]
    BMhs = [0,1]
    BMiotas = [.1,.5]
    ds = [1,2,3]
    omegas = [1,2,3,5]
    rhos = [0,1/3.,2/3.,1]
    
    riskmodels = ["allEUT","allLCP","allHCP","mixed"]
    
    npollss = [1,2,3,5,7,10] # no. polling rounds
    T = 100 # 0 # duration of interactive round
    ptry = .5 # share of trial-and-error voters trying simultaneously
    pfac = 0.1 # prob. that in an iteration a faction will move

    scenarios = ["lazy","middle","strat","allF","allH","allL","allS","allT"]
    
    methodnames = ["PV","AV","RV","IRV","SC","RB","FC","RFC","NL","MPC"]
    
elif case == "TEST":

    jobname = "test"
    do_plots = False
    
    # make unique random seed so that parallel jobs are different:
    seed_offset = 0
    
    mcn = 3 # size of Monte Carlo sample of each node (will be multiplied by two if do_compromises)
    
    nvoterss = 2* (10**linspace(1,3,1000) / 2).astype("int") - 1 # odd numbers log-uniformly distributed from 9 to 999
    noptionss = arange(3,10) 
    
    do_compromises = True 
    umodels = ["unif","BM","GA","QA","LA"]
    BMrs = [2,5,9]
    BMhs = [0,1]
    BMiotas = [.1,.5]
    ds = [1,2,3]
    omegas = [1,2,3,5]
    rhos = [0,1/3.,2/3.,1]
    
    riskmodels = ["allEUT","allLCP","allHCP","mixed"]
    
    npollss = [1,2,3,5,7,10] # no. polling rounds
    T = 100 # 0 # duration of interactive round
    ptry = .5 # share of trial-and-error voters trying simultaneously
    pfac = 0.1 # prob. that in an iteration a faction will move

    scenarios = ["lazy","middle","strat","allF","allH","allL","allS","allT"]
    
    methodnames = ["PV","AV","RV","IRV","SC","RB","FC","RFC","NL","MPC"]
    
elif case == "PLOTS":#
    
    jobname = "2023_08_07_plots_"
    plotname = "plots/" + jobname
    do_plots = True
    
    # make unique random seed so that parallel jobs are different:
    seed_offset = 0
    
    mcn = 1 # size of Monte Carlo sample of each node (will be multiplied by two if do_compromises)
    
    nvoterss = [99]
    noptionss = [5]
    
    do_compromises = False
    umodels = ["GA","QA","LA"]
    BMrs = [0]
    BMhs = [0]
    BMiotas = [0]
    ds = [2]
    omegas = [1,2,3,5]
    rhos = [0,1/3.,2/3.,1]
    
    riskmodels = ["allEUT","allLCP","allHCP","mixed"]
    
    npollss = [1,2,3,5,7,10] # no. polling rounds
    T = 100 # 0 # duration of interactive round
    ptry = .5 # share of trial-and-error voters trying simultaneously
    pfac = 0.1 # prob. that in an iteration a faction will move

    scenarios = ["middle"]
    
    methodnames = ["MPC"]
    
# strategic behavior types:
stypes = ["F","H","L","S","T"]

# types of population mixtures of behavior types:
pbtypes = {
    "lazy":  {"F":1/9.,"H":1/9.,"L":1/3.,"S":1/3.,"T":1/9.},
    "middle":{"F":1/3.,"H":1/6.,"L":1/6.,"S":1/6.,"T":1/6.},
#    "midnoT":{"F":1/3.,"H":1/6.,"L":1/6.,"S":2/6.,"T":0/6.},
    "midnoI":{"F":0,"H":1/3.,"L":1/3.,"S":1/3.,"T":0},
    "strat": {"F":1/2.,"H":1/5.,"L":1/20.,"S":1/20.,"T":1/5.},
    "allF":  {"F":1,"H":0,"L":0,"S":0,"T":0},
    "allH":  {"F":0,"H":1,"L":0,"S":0,"T":0},
    "allL":  {"F":0,"H":0,"L":1,"S":0,"T":0},
    "allS":  {"F":0,"H":0,"L":0,"S":1,"T":0},
    "allT":  {"F":0,"H":0,"L":0,"S":0,"T":1},
    }

# types of population mixtures of risk attitudes:
putypes = {
    "allEUT": [1.,0.,0.],
    "allLCP": [0.,1.,0.],
    "allHCP": [0.,0.,1.],
    "mixed": [.2,.4,.4], # as in Bruhin et al.
    }

############


# transform parameters into numba compatible form:

BMrs = array(BMrs)
BMhs = array(BMhs)
BMiotas = array(BMiotas)
ds = array(ds)
omegas = array(omegas)
rhos = array(rhos)

if do_plots: 
    import pylab as pl
    from cycler import cycler
    from matplotlib.colors import rgb2hex, hsv_to_rgb
    from matplotlib.patches import Ellipse
    # prepare color palettes:
    cyclers = {}
    cyclers[3] = cycler('color', ['red', 'brown', 'blue'])
    cyclers[4] = cycler('color', ['red', 'brown', 'blue', 'black'])
    cyclers[5] = cycler('color', ['red', 'brown', 'blue', 'magenta', 'cyan'])   
    cyclers[6] = cycler('color', ['red', 'brown', 'blue', 'magenta', 'cyan', "black"])   
    cyclers[10] = cycler('color', [rgb2hex(hsv_to_rgb((hv[0],1,.5 + hv[1]*.5))) for hv in [
            (.0,1.),
            (.1,.6),
            (.2,.2),
            (.3,.7),
            (.4,.3),
            (.5,.8),
            (.6,.4),
            (.7,.9),
            (.8,.5),
            (.9,.1),
        ]])
    cyclers[11] = cycler('color', [rgb2hex(hsv_to_rgb((hv[0],1,.5 + hv[1]*.5))) for hv in [
            (.0,1.),
            (.1,.6),
            (.2,.2),
            (.3,.7),
            (.4,.3),
            (.5,.8),
            (.6,.4),
            (.7,.9),
            (.8,.5),
            (.9,.1),
        ]] + ['black'])
    
# initialize random number generator in numba AND python:

theseed = seed_offset + parallelization_rank

@njit
def setseed(): seed(theseed)

setseed()

seed(theseed)

print(parallelization_rank,"%018.7f"%time_started," using seed",theseed)

# init results database:

csvname = results_dir + "/" + jobname + str(parallelization_rank) + ".csv"

result_columns = ([
        # unique key:
        "pr", # parallelization rank                            
        "mci", # Monte Carlo sample index
        "npolls",
        # other method-independent fields:
        "nvoters","noptions","with_compromise",
        "umodel",
            "BMr","BMh","BMiota",
            "dim","omega","rho",
        "scenario",
        "riskmodel",
        "compromise_potential",
        "ppollconverged","apollconverged",
        "bestWutil","bestWgini","bestWegal",
    ] + [ field + "_" + methodname for field in [
        # fields for each method:
        "moverate",
        "keeprate",
        "interactivechanged",
        "Eshannon_initial",
        "Eshannon_final",
        "Erenyi2_initial",
        "Erenyi2_final",
        "Wutil_initial",
        "Wutil_final",
        "Wgini_initial",
        "Wgini_final",
#        "WtheilT_initial",
#        "WtheilT_final",
        "Wegal_initial",
        "Wegal_final",
        "relWutil_initial",
        "relWutil_final",
        "relWgini_initial",
        "relWgini_final",
#        "relWtheilT_initial",
#        "relWtheilT_final",
        "relWegal_initial",
        "relWegal_final",
#        "Igini_initial",
#        "Igini_final",
#        "ItheilT_initial",
#        "ItheilT_final",
        "pcompromise_initial",
        "pcompromise_final",
        "maxprob_initial",
        "maxprob_final",
    ] for methodname in methodnames] + [
        "pctprefer_" + m1 + "_over_" + m2
        for m1 in methodnames for m2 in methodnames if m1 != m2
    ] + [
        "avgsatisfaction_" + fi + "_" + s + "_" + m
        for fi in ["initial","final"] for s in stypes for m in methodnames
    ])
print("result columns:", result_columns)
results = DataFrame(columns = result_columns, index = (0,))
# output header:
results.to_csv(results_dir + "/header_for_" + jobname + ".csv",
               header = True,
               index = False,
               )

# helper functions:

@njit
def rand1(a):
    r = zeros(a)
    for i in range(a): r[i] = random.rand()
    return r

@njit
def rand2(a,b):
    r = zeros((a,b))
    for i in range(a):
        for j in range(b): r[i,j] = random.rand()
    return r

@njit
def randn1(a):
    r = zeros(a)
    for i in range(a): r[i] = random.randn()
    return r

@njit
def randn2(a,b):
    r = zeros((a,b))
    for i in range(a):
        for j in range(b): r[i,j] = random.randn()
    return r

@njit
def choiceunif(X,size=1):
    x = zeros(size)
    n = X.size
    for i in range(size): x[i] = X[int(random.rand() * n)]
    return x

@njit
def choicep(X,p=None,size=1):
    eff = cumsum(p)
    x = arange(size)
    for i in range(size): x[i] = X[argmax(1*(eff > random.rand()))]
    return x

@njit
def freqs(n,intarray):
    res = arange(n)
    res[:] = 0
    #not supported by numba:
    #vals,freqs = unique(intarray,return_counts=1)
    #res[vals] = freqs 
    #hence like this:
    for x in intarray: res[x] += 1
    return res

@njit
def shares(n,intarray):
    res = freqs(n,intarray)
    return res / sum(res)
    
@njit
def argmax0(a): # argmax(a,axis=0)
    n = a.shape[1]
    m = arange(n)
    for i in range(n): m[i] = argmax(a[:,i])  
    return m

@njit
def argmax1(a): # argmax(a,axis=1)
    n = a.shape[0]
    m = arange(n)
    for i in range(n): m[i] = argmax(a[i,:])  
    return m

@njit
def min1(a): # min(a,axis=1)
    n = a.shape[0]
    r = zeros(n)
    for i in range(n): r[i] = np.min(a[i,:])  
    return r

@njit
def max1(a): # max(a,axis=1)
    n = a.shape[0]
    r = zeros(n)
    for i in range(n): r[i] = np.max(a[i,:])  
    return r

@njit
def mean0(a): # mean(a,axis=0)
    n = a.shape[1]
    r = zeros(n)
    for i in range(n): r[i] = mean(a[:,i])  
    return r

@njit
def sum0(a): # sum(a,axis=0)
    n = a.shape[1]
    s = zeros(n)
    for i in range(n): s[i] = sum(a[:,i])  
    return s

@njit
def sum1(a): # sum(a,axis=1)
    n = a.shape[0]
    s = zeros(n)
    for i in range(n): s[i] = sum(a[i,:])  
    return s

@njit
def sort0(a): # sort(a,axis=0)
    s = zeros(a.shape)
    for i in range(a.shape[1]): s[:,i] = sort(a[:,i])
    return s

@njit
def toptwo(a):
    pos1 = argmax(a)
    val1 = a[pos1]
    b = a.copy()
    b[pos1] = a.min() - 1 # this could not have been done in place since jit would not replace a[pos1] !
    pos2 = argmax(b)
    return pos1,val1,pos2,a[pos2]

@njit()
def partition(values, idxs, left, right):
    piv = values[idxs[left]]
    i = left + 1
    j = right
    while True:
        while i <= j and values[idxs[i]] <= piv:
            i += 1
        while j >= i and values[idxs[j]] >= piv:
            j -= 1
        if j <= i:
            break
        idxs[i], idxs[j] = idxs[j], idxs[i]
    idxs[left], idxs[j] = idxs[j], idxs[left]
    return j

@njit
def argsort1D(values):
    idxs = arange(values.shape[0])
    left = 0
    right = values.shape[0] - 1
    max_depth = int(right / 2)
    ndx = 0
    tmp = zeros((max_depth, 2), dtype=int64)
    tmp[ndx, 0] = left
    tmp[ndx, 1] = right
    ndx = 1
    while ndx > 0:
        ndx -= 1
        right = tmp[ndx, 1]
        left = tmp[ndx, 0]
        piv = partition(values, idxs, left, right)
        if piv - 1 > left:
            tmp[ndx, 0] = left
            tmp[ndx, 1] = piv - 1
            ndx += 1
        if piv + 1 < right:
            tmp[ndx, 0] = piv + 1
            tmp[ndx, 1] = right
            ndx += 1
    return idxs

@njit
def reversals(a,b):
    """count pairs i,j with sign(a[i]-a[j]) * sign(b[i]-b[j]) < 0"""
    noptions = a.size
    r = 0
    for i in range(noptions):
        for j in range(i):
            if (a[i]-a[j])*(b[i]-b[j]) < 0: r += 1
    return r
    
# plot functions:

def plotblock(u_=None,block=None,title=None,save=None):
    # TODO: do a better sorting!
    vordering = argsort(block)
    u_ = u_[vordering,:]
    supps = argmax(u_,axis=0)
    oordering = argsort(supps)
    u_ = u_[:,oordering]
    fig = pl.figure(figsize = (6,3))
    pl.tick_params(which='both',bottom='off',left='off',labelbottom='off',labelleft='off') 
    img = zeros((noptions,nvoters,3))
    img[:,:,0] = img[:,:,1] = img[:,:,2] = (u_.max() - u_.transpose()) / (u_.max() - u_.min())
    pl.imshow(img,extent=[0,6,0,3],interpolation='none')
    if title: pl.title(title)
    pl.axis('off')
    if save:
        print(parallelization_rank,"%018.7f"%time(),"   saving fig",save)
        pl.savefig(save,bbox_inches='tight')
    pl.close("all")           
    
plotspace_args = None
def plotspace(d=None,eta_=None,fav=None,xi=None,sigma=None,title=None,xs=None,curves=None,umin=-inf,
              repeat=False,votes=None,save=None):
    global plotspace_args
    if repeat:
        a = plotspace_args
        d=a["d"]
        eta_=a["eta_"]
        fav=a["fav"]
        xi=a["xi"]
        sigma=a["sigma"]
        title=a["title"]
        xs=a["xs"]
        curves=a["curves"]
        umin=a["umin"]
    else:
        plotspace_args = dict(d=d,eta_=eta_,fav=fav,xi=xi,sigma=sigma,title=title,xs=xs,curves=curves,umin=umin)
        votes=fav
    nvoters = fav.size
    noptions = xi.shape[1]
    pl.rc('axes', prop_cycle=(cyclers[noptions]))
    fig = pl.figure(figsize = (6,3*d))
    ax = fig.gca()
    ax.tick_params(which='both',bottom='off',left='off',labelbottom='off',labelleft='off') 
    if d==1: 
        etay = .15 + .2 * rand1(nvoters)
        xiy = .95 - .2 * rand1(noptions)
        umin = max(umin, curves.min())
        curves = (curves - umin) / (curves.max() - umin)
    for x in range(noptions):
        faction = where(fav == x)[0]
        supporters = where(votes == x)[0]
        if d==1:
            xs = xs.flatten()
            ax.set_xlim(xs.min()-.1,xs.max()+.1)
            ax.set_ylim(-1,1)
            ax.plot(xi[0,x,0],xiy[x],"+",color="white",ms=11,markeredgewidth=1.25,zorder=5)
            marker, = ax.plot(xi[0,x,0],xiy[x],"+",ms=10,zorder=6)
            col = marker.get_color()
            ax.add_artist(Ellipse((xi[0,x,0],xiy[x]), height=0.02, width = sigma if umodel=="GH" else sigma[0,x],
                                            fill=False,color="white",lw=1,zorder=3))
            ax.add_artist(Ellipse((xi[0,x,0],xiy[x]), height=0.02, width = sigma if umodel=="GH" else sigma[0,x],
                                            fill=False,color=col,lw=0.25,zorder=4))
            ys = curves[:,x]
            #ax.plot(xs,ys - 1,"-",color="white",lw=1,zorder=3)
            ax.plot(xs,ys - 1,"-",color=col,lw=0.5,zorder=4)
            ax.plot(eta_[faction,0,0],etay[faction],".",color=col,alpha=0.75,ms=5,zorder=1)
            for i in supporters:
                ax.plot([eta_[i,0,0],xi[0,x,0]],[etay[i],xiy[x]],"-",color=col,lw=0.1,alpha=0.25,zorder=2)
        else:
            ax.set_aspect('equal','datalim')
            ax.plot(xi[0,x,0],xi[0,x,1],"+",color="white",ms=11,markeredgewidth=1.25,zorder=5)
            marker, = ax.plot(xi[0,x,0],xi[0,x,1],"+",ms=10,zorder=7)
            col = marker.get_color()
            ax.plot(xi[0,x,0],xi[0,x,1],".",ms=5*sqrt(len(supporters)),color=col,alpha=0.5,zorder=6)
            if umodel not in ["LH","QH"]:
                ax.add_artist(pl.Circle((xi[0,x,0],xi[0,x,1]), sigma if umodel=="GH" else sigma[0,x],
                                               fill=False,color="white",lw=1,alpha=0.75,zorder=3))
                ax.add_artist(pl.Circle((xi[0,x,0],xi[0,x,1]), sigma if umodel=="GH" else sigma[0,x],
                                               fill=False,color=col,ls=(0,(2,1)),lw=0.25,zorder=4))
            ax.plot(eta_[faction,0,0],eta_[faction,0,1],".",color=col,alpha=0.75,ms=5,zorder=2)
            for i in supporters:
                ax.plot([eta_[i,0,0],xi[0,x,0]],[eta_[i,0,1],xi[0,x,1]],"-",color=col,lw=0.1,alpha=0.25,zorder=1)
    if d==1:
        fav2 = argmax(curves,axis=1)
        bds = where(fav2[1:] != fav2[:-1])[0]
        for bd in bds:
            bdx = (xs[bd+1] + xs[bd]) / 2
            bdy = (max(curves[bd,:]) + max(curves[bd+1,:])) / 2
            ax.plot([bdx,bdx],[bdy + .015 - 1,.125],"-",color="grey",lw=0.25)
        for x in range(noptions,curves.shape[1]):
            patterns = [(1,1),(3,1,1,1),(4,2)]
            labels = ["expected utility","high-expectations cum. prospect th.","low-expectations cum. prospect th."]
            ys = curves[:,x]
            #ax.plot(xs,ys - 1,"-",color="white",lw=1.5,zorder=5)
            ax.plot(xs,ys - 1,"grey",ls=[0,patterns[x-noptions]],lw=.5,zorder=1,label=labels[x-noptions])
        #ax.legend(loc=8,fontsize=5,frameon=False,title="utility of benchmark lottery")
        #ax.get_legend().get_title().set_fontsize('5')
        
    if title: pl.title(title)
    ax.axis('off')
    if save:
        print(parallelization_rank,"%018.7f"%time(),"   saving fig",save)
        pl.savefig(save,bbox_inches='tight')
    pl.close("all")

@njit
def draw_utypes(nvoters,p):
    """draw voters' utility types"""
    return choicep(array([0,1,2]), # ["EU","LCP","HCP"],
                   p=array(p),
                   size=nvoters
                   )

@njit
def LCPweightsnorder(m,u):
    order = argsort1D(-u) # list of options by descending u
    delta,gamma = .926,.377 # Bruhin et al. 2010 for gains
    eff = minimum(cumsum(m[order]),1.) # to make sure numerics don't give values > 1
    dcg = delta * eff**gamma
    w = dcg / (dcg + (1. - eff)**gamma) 
    w[1:] = w[1:] - w[:-1]
    return w,order

@njit
def HCPweightsnorder(m,u):
    order = argsort1D(u) # list of options by ascending u
    delta,gamma = .991,.397 # Bruhin et al. 2010 for losses
    eff = minimum(cumsum(m[order]),1.) # to make sure numerics don't give values > 1
    dcg = delta * eff**gamma
    w = dcg / (dcg + (1. - eff)**gamma) 
    w[1:] = w[1:] - w[:-1]
    return w,order

@njit
def evaluate(m,u,ut):
    """evaluate lottery depending on utility type"""
    if ut == 1: # "LCP"
        w,order = LCPweightsnorder(m,u)
        res = sum(w*u[order]) #dot(w,u[order])
        return res
    if ut == 2: # "HCP"
        w,order = HCPweightsnorder(m,u)
        res = sum(w*u[order]) #dot(w,u[order])
        return res
    # ut = 0, "EU":
    return sum(m*u) #dot(m,u)


@njit
def evaluations_old(m,u_,ut_,voters):
    nvoters = len(voters)
    v = zeros(nvoters)
    for ipos in range(nvoters): 
        i = voters[ipos]
        v[ipos] = evaluate(m,u_[i],ut_[i])
    return v

deltaLCP,gammaLCP = .926,.377 # Bruhin et al. 2010 for gains
deltaHCP,gammaHCP = .991,.397 # Bruhin et al. 2010 for losses
@njit
def evaluations(m,u_,ut_,voters):
    nvoters = len(voters)
    v = zeros(nvoters)
    for ipos in range(nvoters): 
        i = voters[ipos]
        if ut_[i] == 1: # "LCP"
            order = argsort1D(-u_[i]) # list of options by descending u
            eff = minimum(cumsum(m[order]),1.) # to make sure numerics don't give values > 1
            dcg = deltaLCP * eff**gammaLCP
            w = dcg / (dcg + (1. - eff)**gammaLCP) 
            w[1:] = w[1:] - w[:-1]
            res = sum(w*u_[i][order]) #dot(w,u_[i][order])
            v[ipos] = res
        elif ut_[i] == 2: # "HCP"
            order = argsort1D(u_[i]) # list of options by ascending u
            eff = minimum(cumsum(m[order]),1.) # to make sure numerics don't give values > 1
            dcg = deltaHCP * eff**gammaHCP
            w = dcg / (dcg + (1. - eff)**gammaHCP) 
            w[1:] = w[1:] - w[:-1]
            res = sum(w*u_[i][order]) #dot(w,u_[i][order])
            v[ipos] = res
        # ut = 0, "EU":
        else: 
            #v[ipos] = dot(m,u_[i]) # this is a leaky line! apparently dot is buggy in numba
            v[ipos] = sum(m*u_[i]) 
    return v

@njit
def satisfactions(m,u_,ut_,voters):
    v = evaluations(m,u_,ut_,voters)
    nvoters = len(voters)
    s = zeros(nvoters)
    for ipos in range(nvoters): 
        i = voters[ipos]
        s[ipos] = (v[ipos] - u_[i].min()) / (u_[i].max() - u_[i].min() + 1e-10) 
    return s

#@njit does not support stack
def makelcurves(ocurves,m):
    nvoters = ocurves.shape[0]
    voters = arange(nvoters)
    EUTcurve = evaluations(m,ocurves,zeros(nvoters),voters)
    HCPcurve = evaluations(m,ocurves,zeros(nvoters) + 2,voters)
    LCPcurve = evaluations(m,ocurves,ones(nvoters),voters)
    curves = stack((EUTcurve,HCPcurve,LCPcurve),axis=1)
    return curves

# utility models:

def draw_btypes(nvoters,p=None):
    """draw voters' behavioural types so that factionals come first"""
    st_ = array(sorted(choice(["F","H","L","S","T"],p=p,size=nvoters)),dtype="U01") # CAUTION: "F" must be smallest in order!
    nfactional = where(char.strip(st_) == "F")[0].size
    return st_, nfactional

#@njit does not support sum over axis yet
def makeuLA(eta_,xi,sigma,d): 
    return - sum(abs(eta_ - xi),axis=2) / sigma - d * log(2*sigma)

#@njit does not support sum over axis yet
def makeuQA(eta_,xi,sigma,d): 
    return - sum((eta_ - xi)**2,axis=2) / (2*sigma**2) - d * log(sqrt(2*np.pi)*sigma)

#@njit does not support sum over axis yet
def makeuGA(eta_,xi,sigma,d): 
    return exp(- sum((eta_ - xi)**2,axis=2) / (2*sigma**2)) / (sqrt(2*np.pi)*sigma)**d

def generate_utility(nvoters,noptions,umodel,nfactional,res):
    """generate utility profiles depending on utility model"""
     
    d,eta_,xi,sigma,block,xs,curves,umin = inf,None,None,None,None,None,None,-inf
    u1_,eta1_,block1,facsizes1,facstarts1,facu1 = None,None,None,None,None,None
    
    unanimous = True
    
    while unanimous:
        if umodel == "unif":
            
            u_ = rand2(nvoters,noptions)
            u1_ = u_.copy() 
            u1_[:,0] = mean(u_[:,1:],axis=1) # compromise is mean
            
        elif umodel == "BM": # block model
            
            res["BMr"] = r = choice(BMrs)
            res["BMh"] = h = choice(BMhs)
            res["BMiota"] = iota = choice(BMiotas)
            print(parallelization_rank,"%018.7f"%time(),"   r,h,iota",r,h,iota)
            s = exp(h * randn1(r))
            s /= sum(s)
            u_ = iota * randn2(nvoters,noptions)
            U = randn2(r,noptions)
            block = array(choicep(arange(r),p=s,size=nvoters),"int")
            for i in range(nvoters): u_[i,:] += U[block[i],:]
            u1_ = u_.copy() 
            u1_[:,0] = mean(u_[:,1:],axis=1) # compromise is mean
            
            if do_plots:
                plotblock(u_=u_,block=block,
                          title = umodel+" r "+str(r)+" h "+str(h)+" iota "+str(iota),
                          save = results_dir + "/" + plotname + str(parallelization_rank) + "_"+str(mci)+".pdf"
                          )
            
        else: # spatial models:
                
            res["dim"] = d = choice(ds)
            res["omega"] = omega = choice(omegas) # voter heterogeneity parameter
            res["rho"] = rho = choice(rhos)
            sigma = exp(rho * randn2(1,noptions))
            print(parallelization_rank,"%018.7f"%time(),"   d,omega,rho",d,omega,rho)
    
            if umodel == "LA":
                eta_ = (random.rand(nvoters,1,d) * 2 - 1) * omega
                xi = random.rand(1,noptions,d) * 2 - 1
            else:
                eta_ = random.randn(nvoters,1,d) * omega
                xi = random.randn(1,noptions,d)
                
            if umodel == "LA": makeu = makeuLA
            elif umodel == "QA": makeu = makeuQA
            elif umodel == "GA": makeu = makeuGA
            else: 
                raise Exception("umodel "+umodel+" not implemented")
                
            u_ = makeu(eta_,xi,sigma,d)
            
            if d==1: 
                xs = linspace(min(eta_[:,0,0]),max(eta_[:,0,0]),1000).reshape((-1,1,1))
                curves = makeu(xs,xi,sigma,d)
    
            # construct potential consensus option:
            u1_ = u_.copy() #concatenate((u_, zeros((nvoters,1)) - inf), axis=1) # another array since we will sort voters by favourite
    
            # iterate several times:
            for it in range(10):
                # find preliminary favourites and benchmark lottery:
                fav = argmax(u1_,axis=1)
                benchmarkl = shares(noptions, fav)                
                weights = benchmarkl / sigma
                sumweights = sum(weights)
                # construct compromise:
                xi[0,0,:] = xic = tensordot(weights,xi,axes=([1],[1])) / sumweights
                sigma[0,0] = sigmac = 1. / sumweights
                u1_[:,[0]] = makeu(eta_,xic,sigmac,d)
    
            fav = argmax(u1_,axis=1)
            benchmarkl = shares(noptions, fav)
            
            if d==1: 
                # also show utilities of benchmark:
                lcurves = makelcurves(curves,benchmarkl)
                curves = concatenate((curves,lcurves),axis=1)
                umin = lcurves[:,0].min() # for plotting
                
            # plot:
            if d <= 2 and do_plots:
                plotspace(d=d,eta_=eta_,fav=fav,xi=xi,sigma=sigma,xs=xs,curves=curves,umin=umin,
                          title = umodel+" d "+str(d)+" omega "+str(omega)+" mean(sigma) "+str(mean(sigma)),
                          save = results_dir + "/" + plotname + str(parallelization_rank) + "_"+str(mci)+".pdf"
                          )

        fav = argmax(u_,axis=1)
        unanimous = all(fav == fav[0]) # check if unanimous
        
    print(parallelization_rank,"%018.7f"%time(),"   utility std(option mean) / overall std",std(mean(u_,axis=0))/std(u_))

    # sort factionals by favourite so that factions are intervals:
    fav = argmax(u_[:,:noptions],axis=1)[:nfactional]
    order = argsort(fav)
    u_[:nfactional,:noptions] = u_[order,:noptions]
    if eta_ is not None: eta_[:nfactional,:noptions] = eta_[order,:noptions]
    if block is not None: block[:nfactional] = block[order]
    # analyse factions:
    facsizes = array(freqs(noptions,fav),"int")
    facstarts = array(concatenate(([0],cumsum(facsizes))),"int")
    facu = zeros((noptions,noptions))
    for x in range(noptions):
        if facsizes[x] > 0: facu[x,:] = sum(u_[facstarts[x]:facstarts[x+1],:noptions],axis=0)

    # same for alternative:
    fav = argmax(u1_,axis=1)[:nfactional]
    order = argsort(fav)
    u1_[:nfactional,:] = u1_[order,:]
    if eta_ is not None: 
        eta1_ = eta_.copy()
        eta1_[:nfactional,:] = eta1_[order,:]
    if block1 is not None: block1[:nfactional] = block1[order]
    # analyse factions:
    facsizes1 = array(freqs(noptions,fav),"int")
    facstarts1 = array(concatenate(([0],cumsum(facsizes1))),"int")
    facu1 = zeros((noptions,noptions))
    for x in range(noptions):
        if facsizes1[x] > 0: facu1[x,:] = sum(u1_[facstarts1[x]:facstarts1[x+1],:],axis=0)

    return xi,sigma,block,block1,u_,u1_,eta_,eta1_,facsizes,facsizes1,facstarts,facstarts1,facu,facu1


# ballot construction methods:

@njit
def sincerefav(u_):
    return argmax1(u_)

###@njit
def sincerea(u_,ul_):
    return (1 * (u_ >= ul_.reshape((-1,1)))).astype("int")

@njit
def sincererv(u_):
    nvoters,noptions = u_.shape
    umin = min1(u_).reshape((nvoters,1))
    return 100. * (u_ - umin) / (max1(u_).reshape((nvoters,1)) - umin)

@njit
def sincererankings(u_):
    nvoters, noptions = u_.shape
    b = zeros((nvoters,noptions),dtype=np.int64)
    for i in range(nvoters):
        b[i,:] = argsort1D(-u_[i,:])
    return b
    
@njit
def sincerefcrb(u_,ul_,favs,ascores,asincere):
    nvoters, noptions = u_.shape
    b = zeros((nvoters, 2),dtype=np.int64)
    b[:,0] = favs
    for i in range(nvoters):
        b[i,1] = argmax(ascores * asincere[i,:])
    return b

@njit
def sincerefcrbr(rvsincere,fcrbsincere):
    nvoters, noptions = rvsincere.shape
    b = zeros((nvoters, 2 + noptions))
    b[:,:2] = fcrbsincere
    b[:,2:] = rvsincere
    return b

@njit
def sincerenl(u_):
    nvoters, noptions = u_.shape
    umin = min1(u_).reshape((nvoters,1))
    return 100. * (u_ - umin) / (max1(u_).reshape((nvoters,1)) - umin)

@njit
def sinceremp(u_,ul_,psincere,alpha):
    nvoters, noptions = u_.shape
    b = zeros((nvoters,noptions))
    for i in range(nvoters):
        for x in range(noptions):
            if u_[i,x] >= ul_[i]:
                b[i,x] = 100 * (alpha + (1 - alpha) * (u_[i,x] - ul_[i] + 1e-20) / (u_[i,psincere[i]] - ul_[i] + 1e-20))
    return b

###@njit
def sincereall(u_,ut_,pscores,ascores,alpha):
    #noptions = u_.shape[1]
    m = pscores / sum(pscores)
    ul_ = evaluations(m,u_,ut_,arange(u_.shape[0]))
    favs = psincere = rbsincere = sincerefav(u_)
    asincere = sincerea(u_,ul_)
    rvsincere = sincererv(u_)
    irvsincere = scsincere = sincererankings(u_)
    fcrbsincere = sincerefcrb(u_,ul_,favs,ascores,asincere)
    fcrbrsincere = sincerefcrbr(rvsincere,fcrbsincere)
    nlsincere = sincerenl(u_)
    mpsincere = sinceremp(u_,ul_,psincere,alpha)
    return (
        psincere,asincere,rvsincere,
        irvsincere,scsincere,
        rbsincere,fcrbsincere,fcrbrsincere,
        nlsincere,mpsincere,
        )
        
@njit
def heuristicp(u_,pscores,voters):
    y,py,z,pz = toptwo(pscores)
    nvoters = len(voters)
    pballots = zeros(nvoters)
    for ipos in range(nvoters):
        i = voters[ipos]
        pballots[ipos] = y if u_[i,y] > u_[i,z] else z
    return pballots
            
@njit
def heuristica(u_,ascores,voters):
    noptions = u_.shape[1]
    y,ay,z,az = toptwo(ascores)
    nvoters = len(voters)
    aballots = zeros((nvoters,noptions))
    for ipos in range(nvoters):
        i = voters[ipos]
        aballots[ipos,:] = 1 * (u_[i,:] > u_[i,y])
        aballots[ipos,y] = 1 if u_[i,y] > u_[i,z] else 0
    return aballots


# pairwise aggregate preferences:

@njit
def obeatmatrix(u_):
    noptions = u_.shape[1]
    p = zeros((noptions,noptions))
    for i in range(noptions):
        for j in range(noptions):
            p[i,j] = mean(u_[:,i] > u_[:,j])
    return p

@njit
def lbeatmatrix(ls,u_,ut_):
    """each row in ls is a lottery"""
    nlotteries = ls.shape[0]
    nvoters = u_.shape[0]
    voters = arange(nvoters)
    v = zeros((nvoters,nlotteries))
    for i in range(nlotteries):
        v[:,i] = evaluations(ls[i,:],u_,ut_,voters)
    p = zeros((nlotteries,nlotteries))
    for i in range(nlotteries):
        for j in range(nlotteries):
            p[i,j] = mean(v[:,i] > v[:,j])
    return p


# tally helper functions:

@njit
def getpscores(noptions,pballots):
    return freqs(noptions,pballots)
    
@njit
def getascores(aballots):
    return sum0(aballots)


# methods:

@njit
def mPlurality(noptions,voted):
    """voted: array with entry i = option voted for by voter i or noptions if abstention"""
    nvotes = freqs(noptions + 1,voted)[:-1]
    wins = (nvotes == nvotes.max())
    return wins / sum(wins)

#print(mPlurality(3,array([0,1,1,1,2,2,2]))); quit()

@njit
def mApproval(approvals):
    """approvals: array with entry [i,x] = 1 if i approves of x else 0"""
    scores = sum0(approvals) #dot(ones((1,approvals.shape[0])),1.*approvals).flatten() # CAUTION of dot bug!
    wins = (scores == scores.max())
    return wins / sum(wins)

#A = (rand2(4,3)>.5)*1; print(A,mApproval(A)); quit()

@njit
def mRange(ratings):
    """ratings: array with entry [i,x] = rating of x by i"""
    scores = sum0(ratings)
    wins = (scores == scores.max())
    return wins / sum(wins)

@njit
def mCondorcet(ranks):
    """ranks: array with entry [i,x] = rank of x by i or noptions if unranked"""
    nvoters,noptions = ranks.shape
    oppo = zeros((noptions,noptions))
    scores = zeros((noptions))
    for i in range(noptions):
        for j in range(noptions):
            o = oppo[i,j] = sum(ranks[:,i] > ranks[:,j]) # no. voters ranking i worse than j
            if -o < scores[i]: scores[i] = -o
    wins = (scores == scores.max())
    return wins / sum(wins)
            
#R = rand2(10,5); print(R,mCondorcet(R)); quit()

@njit
def mIRV(ranked):
    """ranked: array with entry [i,k] = kth ranked option by voter i or noptions"""
#    print(ranked)
    nvoters,noptions = ranked.shape
    isactive = ones(noptions + 1)
    col = zeros(nvoters)
    voted = ranked[:,0].copy()
    nvotes = freqs(noptions,voted)
    for r in range(noptions - 1):
        least = nvotes.min()
        losers = where(nvotes == least)[0]
        x = losers[random.choice(len(losers))]
#        print(r,voted,least,losers,x)
        isactive[x] = 0
        for i in range(nvoters):
            if voted[i] == x:
                eff = int(col[i])
                y = int(ranked[i,eff])
                while not isactive[y]:
                    eff += 1
                    y = int(ranked[i,eff])
                col[i] = eff
                voted[i] = y
                if y < noptions: 
                    nvotes[y] += 1
        nvotes[x] = nvoters + 1 # so that it does not get chosen again
    winner = nvotes.argmin() # the others have nvoters + 1
    probs = zeros(noptions)
    probs[winner] = 1
    return probs

@njit
def mRB(noptions,voted):
    """voted: array with entry i = option voted for by voter i or noptions if abstention"""
    nvotes = freqs(noptions + 1,voted)[:-1]
    return nvotes / sum(nvotes)

@njit
def mFCRB(noptions,ballots):
    nvoters,dummy = ballots.shape
    favs = zeros(nvoters, dtype=np.int64)
    cons = zeros(nvoters, dtype=np.int64)
    favs[:] = ballots[:,0]
    cons[:] = ballots[:,1]
    """favs,cons: arrays with entry i = option marked as favourite or consensus by voter i, or noptions if abstention"""
    ncons = freqs(noptions + 1,cons)[:-1]
    if sum(ncons > 0) == 1: # if all non-abstaining marked the same consensus
        probs = zeros(noptions)
        probs[argmax(ncons)] = 1
        return probs
    else: 
        return mRB(noptions,favs)

#print(mFCRB(3,array([0,1,1,1,2,2,2]),array([3,1,1,1,1,1,1]))); quit()

@njit
def mFCRBR(ballots):
    nvoters,dummy = ballots.shape
    favs = zeros(nvoters, dtype=np.int64)
    cons = zeros(nvoters, dtype=np.int64)
    favs[:] = ballots[:,0]
    cons[:] = ballots[:,1]
    ratings = ballots[:,2:]
    """
    favs,cons: arrays with entry i = option marked as favourite or consensus by voter i, or noptions if abstention
    ratings: array with entry [i,x] = rating of x by i
    """
    nvoters,noptions = ratings.shape
    m = mRB(noptions,favs) # fallback lottery 
    rl = dot(ratings,m.reshape((noptions,1))) # fallback lottery ratings column # CAUTION of dot bug!
    iscons = (dot(ones((1,nvoters)),(ratings > rl)*1.) == nvoters).flatten() # whether x is possible consensus # CAUTION of dot bug!
    pcons = iscons * freqs(noptions + 1,cons)[:-1] / nvoters # probability that x is chosen and passed as consensus
    return pcons + m * (1 - sum(pcons))
    
#R = rand2(7,3); R[:,1]=2; print(mFCRBR(array([0,1,1,1,2,2,2]),array([3,1,1,1,1,1,1]),R)); quit()

@njit
def nashsum(p, r):
    """return Nash sum given probabilities p[x] and ratings r[i,x]"""
    s = 0
    nvoters,noptions = r.shape
    for i in range(nvoters): s += log(sum(p*r[i,:]))
    return s
    
@njit
def nl_target(q, r):
    """minimization nl_target in term of transformed probabilities q[x] (x>1)"""
    return - nashsum(q2p(q), r)

@njit
def q2p(q):
    """transform k-1 real-valued "probability coordinates" q[x] (x>1) into k probabilities p[x] (x>=1)"""
    s = exp(q)
    S = sum(s)
    return array([1] + list(s)) / (1. + S)

@njit
def p2q(p):
    """inverse transformation"""
    q = zeros(p.size - 1)
    for i in range(p.size-1): q[i] = log(p[i+1] / p[0])
    return q

@njit
def nlp_target(p, r):
    """minimization nl_target in term of probabilities p[x]"""
    return - nashsum(p, r)

@njit
def pineqconstraint(p):
    return p.min()

@njit
def peqconstraint(p):
    return 1 - p.sum()

@njit
def pineq2constraint(p):
    ps = p.sum()
    return min(p.min(), 1 - ps, ps - 1)

@njit
def P2p(P):
    """transform k-1 "probability coordinates" 0 <= P[x] <= 1 into k probabilities p[x]"""
    p = array(list(P) + [0])
    rest = 1
    for i in range(P.size):
        payoffs = p[i] = rest * P[i]
        rest -= payoffs
    p[P.size] = rest
    return p

@njit
def p2P(p):
    """transform k probabilities p[x] into k-1 "probability coordinates" 0 <= P[x] <= 1"""
    P = 0 * p[:-1]
    rest = 1
    for i in range(P.size):
        P[i] = p[i] / rest
        rest -= p[i]
    return P

@njit
def nlP_target(P, r):
    """minimization nl_target in term of transformed probabilities P[x] (x>1)"""
    p = P2p(P)
    return - nashsum(p, r)


# @njit does not work here because of scipy.optimize.minimize
def mNL (ratings):
    """return probabilities p[x] maximizing Nash product given ratings ratings[i,x] and optional weights w[i]"""
    p00 = p0 = 1.*sum(ratings / sum(ratings, axis=1).reshape((-1,1)), axis=0) + 1e-5
    p0 /= sum(p0) # initial guess for p[x] is proportional to total rating of x 
#    q0 = p2q(p0)
    P0 = p2P(p0)
    nvoters,noptions = ratings.shape
    
#    print("  nl_target...")
#    res = minimize(nl_target,
#                   q0,
#                   args = (ratings,),
#                   method = 'L-BFGS-B',
#                   options = {"maxiter":200,"disp":0},
#                   )
    res = minimize(nlP_target,
                   P0,
                   args = (ratings + 1e-5,), # 1e-5*random.rand(nvoters,noptions)
                   method = 'SLSQP',
                   bounds = [(0,1) for i in P0],
                   options = {"maxiter":200,"disp":0},
#                   options = {"maxiter":20000,"disp":0,'ftol':1e-50},
                   )
#    res = minimize(nlp_target,
#                   p0,
#                   args = (ratings,),
#                   method = 'COBYLA',
#                   constraints = {"type":"ineq", "fun":pineq2constraint},
##                   method = 'SLSQP',
##                   constraints = [{"type":"ineq", "fun":pineqconstraint},
##                                  {"type":"eq", "fun":peqconstraint}]
#                   )
#    print("  ...done")
    if not (res["success"] == True 
            or res["status"] in (4, 8, 9)  # accept iteration limit exceeded
            ):  # accept pos. dir. deriv.
        print("OOPS!",res,ratings,p00,p0,P0)
        return p0
#    q = res["x"]
#    assert not any(isnan(q)), "SOSO! "+str((ratings,p0,q0,q))
#    p = q2p(q)
    P = res["x"]
    p = P2p(P)
#    p = res["x"]
    p000 = ones(p0.size)
    return p if not any(isnan(p)) else p0 if not any(isnan(p0)) else p000/sum(p000)


@njit
def mMaxParC(ratings,dovotes=False):
    # i approves of x iff strictly less than rix% disapprove of x.
    # let the voters i=0...n-1 be sorted so that r0x <= r1x <= ... <= r(n-1)x,
    # and let j be the smallest i>=0 with i/n < rix%, or n if none such i exists.
    # then the j many voters i=0..j-1 disapprove of x and the n-j many voters i=j..n-1 approve of x:
    # for i<j, j/n > i/n >= rix% by definition of j, hence strictly more than rix% disapprove of x, hence i disapproves of x.
    # for i>=j, j/n < rjx% <= rix% by sorting, hence strictly less than rix% disapprove of x, hence i approves of x.

    nvoters,noptions = ratings.shape

    # sort ratings of each option an add a 200 at the end to complete:
    rs = np.zeros((nvoters+1,noptions))
    rs[:nvoters,:] = sort0(ratings)
    rs[nvoters,:] = 200.
    # column vector 100*i/nvoters:
    cmp = (100.*np.arange(nvoters + 1) / nvoters).reshape((nvoters + 1, 1))
    # for each x, find smallest i with i/n < rix%:
    js = argmax0(1*(cmp < rs)) + 1 # since argmax returns FIRST position of max (which is True here)
    # approval thresholds (i approves iff rix is larger than tx):
    ts = 100. * (js - 1) / nvoters
    # approval:
    a = (ratings > ts)
    # options in ascending threshold order (with total rating as tiebreaker)
    xs = argsort1D(ts - mean0(ratings) / 200)
    
    # approvals sorted alike, with a final true column added:
    a2 = np.zeros((nvoters,noptions+1))
    a2[:,:noptions] = a[:,xs]
    a2[:,noptions] = True
    r2 = np.zeros((nvoters,noptions+1))
    r2[:,:noptions] = ratings[:,xs]
    ascores = sum0(a2) + mean0(r2) / 200
    # i votes for first approved option:
    maxapproval = np.zeros(nvoters)
    nvotedfor = np.zeros(nvoters)
    votesreceived = np.zeros(noptions+1)
    for i in range(nvoters):
        maxapproval[i] = -np.inf
        for x in range(noptions+1):
            if maxapproval[i] == -np.inf and a2[i,x]: maxapproval[i] = ascores[x]
            elif ascores[x] < maxapproval[i]: break
            if maxapproval[i] != -np.inf and a2[i,x]: nvotedfor[i] += 1
    for i in range(nvoters):
        for x in range(noptions):
            if ascores[x] == maxapproval[i] and a2[i,x]: 
                votesreceived[x] += 1. / nvotedfor[i]
            elif ascores[x] < maxapproval[i]: break

    # probability = vote share per option:
    p = np.zeros(noptions)
    for x in range(noptions): p[xs[x]] = votesreceived[x]
    if sum(p) == 0: p = np.ones(noptions) # If all votes are abstentions, then all options are equally likely.
    
    return p / sum(p), ascores

# same method but now returning votes:
@njit
def mMaxParC_votes(ratings):
    # i approves of x iff strictly less than rix% disapprove of x.
    # let the voters i=0...n-1 be sorted so that r0x <= r1x <= ... <= r(n-1)x,
    # and let j be the smallest i>=0 with i/n < rix%, or n if none such i exists.
    # then the j many voters i=0..j-1 disapprove of x and the n-j many voters i=j..n-1 approve of x:
    # for i<j, j/n > i/n >= rix% by definition of j, hence strictly more than rix% disapprove of x, hence i disapproves of x.
    # for i>=j, j/n < rjx% <= rix% by sorting, hence strictly less than rix% disapprove of x, hence i approves of x.

    nvoters,noptions = ratings.shape

    # sort ratings of each option an add a 200 at the end to complete:
    rs = zeros((nvoters+1,noptions))
    rs[:nvoters,:] = sort0(ratings)
    rs[nvoters,:] = 200.
    # column vector 100*i/nvoters:
    cmp = (100.*arange(nvoters + 1) / nvoters).reshape((nvoters + 1, 1))
    # for each x, find smallest i with i/n < rix%:
    js = argmax0(1*(cmp < rs)) + 1 # since argmax returns FIRST position of max (which is True here)
    # approval thresholds (i approves iff rix is larger than tx):
    ts = 100. * (js - 1) / nvoters
    # approval:
    a = (ratings > ts)
    # options in ascending threshold order (with total rating as tiebreaker)
    xs = argsort1D(ts - mean0(ratings) / (2*nvoters))
    # approvals sorted alike, with a final true column added:
    a2 = zeros((nvoters,noptions+1))
    a2[:,:noptions] = a[:,xs]
    a2[:,noptions] = True
    ascores = sum0(a2)
    # i votes for first approved option:
    maxapproval = zeros(nvoters)
    nvotedfor = zeros(nvoters)
    votesreceived = zeros(noptions+1)
    votes = zeros(nvoters) - 1
    for i in range(nvoters):
        maxapproval[i] = -inf
        for x in range(noptions+1):
            if maxapproval[i] == -inf and a2[i,x]: maxapproval[i] = ascores[x]
            elif ascores[x] < maxapproval[i]: break
            if maxapproval[i] != -inf and a2[i,x]: nvotedfor[i] += 1
    for i in range(nvoters):
        for x in range(noptions):
            if ascores[x] == maxapproval[i] and a2[i,x]: 
                votesreceived[x] += 1. / nvotedfor[i]
                votes[i] = x  # just one of them
            elif ascores[x] < maxapproval[i]: break
    # probability = vote share per option:
    p = zeros(noptions)
    for x in range(noptions): p[xs[x]] = votesreceived[x]
    if sum(p) == 0: p = ones(noptions)
    return votes

#print(mMaxParC(array([[100.,0.,34.,0.],[0.,100.,34.,0.],[0.,0.,0.,100.]])))
#print(mMaxParC(array([[100.,34.,0.,0.],[0.,34.,100.,0.],[0.,0.,0.,100.]])))
#print(mMaxParC(array([[34.,100.,0.,0.],[34.,0.,100.,0.],[0.,0.,0.,100.]])))
#quit()


# TODO:
#    expected log(sigma), log(mean-of-squared-distances to competitors), and log(mean -of-squared-distances to voters) of winner!

# entropy measures:

@njit
def Eshannon(m): 
    return - sum(m * log(m + (m==0)))

@njit
def Erenyi2(m): 
    return - log(sum(m**2))


# welfare and inequality measures:

@njit
def Wutil(v): 
    return mean(v)

def minmaxWutil(u_):
    Ws = mean(u_,axis=0)
    return min(Ws),max(Ws)

@njit
def Wgini(v): # restricted to distinct i,j!
    w = arange(v.size-1,-1,-1) # smallest value gets largest weight
    return sum(w*array(sorted(v))) / sum(w)

def minmaxWgini(u_): # restricted to distinct i,j!
    w = arange(u_.shape[0]-1,-1,-1)
    Ws = sum(w.reshape((-1,1))*array(sort(u_,axis=0)),axis=0) / sum(w)
    return min(Ws),max(Ws)

@njit
def Wegal(v):
    return v.min()

def minmaxWegal(u_):
    Ws = u_.min(axis=0)
    return min(Ws),max(Ws)

#@njit
#def WtheilT(v):
#    mu = mean(v)
#    vmu = v / mu
#    return mu * exp(- mean(vmu * log(vmu)))
    
#@njit
#def Igini(v):
#    return 1 - Wgini(v) / Wutil(v)

#@njit
#def ItheilT(v):
#    mu = mean(v)
#    vmu = v / mu
#    return mean(vmu * log(vmu))
    

# method-specific interactive simulations:

@njit
def interactive_plurality(u_,ut_,B0,sincereB,Tvoters,Fvoters,facsizes,facstarts,facu):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    lchangebyiteration = zeros(T)
    m = mPlurality(noptions,B0)
    for r2 in range(T):
        lastl = m
        m = mPlurality(noptions,B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        ul = evaluations(m,u_,ut_,Tvoters)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0,f1 = int(facstarts[unit]),int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf > 0:
                nfactrials += 1
                # here comes the logics:
                otherscores = freqs(noptions,B) - freqs(noptions,B[f0:f1])
                maxotherscore = otherscores.max()
                possiblewinners = where(otherscores + nf > maxotherscore)[0]
                if possiblewinners.size > 1:
                    bestwinner = possiblewinners[argmax(facu[unit][possiblewinners])]
                    B[f0:f1] = bestwinner
                    nfacmoves += 1
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                newB[i] = choiceunif(arange(noptions))[0]
        # tally anew:
        newl = mPlurality(noptions,newB)
        newul = evaluations(newl,u_,ut_,Tvoters)
        for ipos in range(nTvoters):
            i = Tvoters[ipos]
            if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                    # new ballot is less sincere than old: 
                                    u_[i,newB[i]] < u_[i,B[i]]
#                                    B[i] == sincereB[i] != newB[i]
                                    ): 
                newB[i] = B[i] # revert modification
                nreverts += 1
            else: 
                B[i] = newB[i] # keep modification
                nkeeps += 1
            # now newB == B
    # final result
    m = mPlurality(noptions,B)
    ul = evaluations(m,u_,ut_,Tvoters)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration
        
@njit 
def interactive_approval(u_,ut_,B0,sincereB,Tvoters,Fvoters,facsizes,facstarts,facu):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    revs = arange(nvoters)
    for i in range(nvoters): revs[i] = reversals(B[i,:],u_[i,:])
    lchangebyiteration = zeros(T)
    m = mApproval(B0)
    for r2 in range(T):
        lastl = m
        m = mApproval(B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0,f1 = int(facstarts[unit]),int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf>0:
                nfactrials += 1
                # here comes the logics:
                otherscores = sum0(B) - sum0(B[f0:f1])
                maxotherscore = otherscores.max()
                possiblewinners = where(otherscores + nf > maxotherscore)[0]
                if possiblewinners.size > 1:
                    bestwinner = possiblewinners[argmax(facu[unit][possiblewinners])]
                    B[f0:f1,:] = 0
                    B[f0:f1,bestwinner] = 1
                    nfacmoves += 1
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                x = int(choiceunif(arange(noptions))[0])
                newB[i,x] = 1. - B[i,x]
        # tally anew:
        newl = mApproval(newB)
        ul = evaluations(m,u_,ut_,Tvoters)
        newul = evaluations(newl,u_,ut_,Tvoters)
        for ipos in range(nTvoters):
            i = Tvoters[ipos]
            newrevs = reversals(newB[i,:],u_[i,:])
            if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                    # new ballot is less sincere than old: 
                                    revs[i] < newrevs
                                    ): 
                newB[i] = B[i] # revert modification
                nreverts += 1
            else: 
                B[i] = newB[i] # keep modification
                revs[i] = newrevs
                nkeeps += 1
            # now newB == B
    # final result
    m = mApproval(B)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration
        
@njit 
def interactive_range(u_,ut_,B0,sincereB,Tvoters,Fvoters,facsizes,facstarts,facu):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    lchangebyiteration = zeros(T)
    m = mRange(B0)
    for r2 in range(T):
        lastl = m
        m = mRange(B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0,f1 = int(facstarts[unit]),int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf>0:
                nfactrials += 1
                # here comes the logics:
                otherscores = sum0(B) - sum0(B[f0:f1])
                maxotherscore = otherscores.max()
                possiblewinners = where(otherscores + 100*nf > maxotherscore)[0]
                if possiblewinners.size > 1:
                    bestwinner = possiblewinners[argmax(facu[unit][possiblewinners])]
                    B[f0:f1,:] = 0.
                    B[f0:f1,bestwinner] = 100.
                    nfacmoves += 1
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                x = int(choiceunif(arange(noptions))[0])
                newB[i,x] = random.rand() * 100.
        # tally anew:
        newl = mRange(newB)
        ul = evaluations(m,u_,ut_,Tvoters)
        newul = evaluations(newl,u_,ut_,Tvoters)
        for ipos in range(nTvoters):
            i = Tvoters[ipos]
            if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                    # new ballot is less sincere than old: 
                                    sum((newB[i] - sincereB[i])**2) > sum((B[i] - sincereB[i])**2)
                                    ): 
                newB[i] = B[i] # revert modification
                nreverts += 1
            else: 
                B[i] = newB[i] # keep modification
                nkeeps += 1
            # now newB == B
    # final result
    m = mRange(B)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration
        
@njit0
def interactive_IRV(u_,ut_,B0,sincereB,Tvoters,Fvoters,facsizes,facstarts,facu,permutations):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()#.reshape((-1,noptions)).astype(int32)
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    revs = arange(nvoters)
    for i in range(nvoters):
        fakui = zeros(noptions+1)
        fakui[B[i,:]] = arange(noptions,0,-1)
#        for ii in range(noptions): fakui[int(B[i,ii])] = noptions - ii
        revs[i] = reversals(fakui,u_[i,:])
    lchangebyiteration = zeros(T)
    m = mIRV(B0)
    for r2 in range(T):
        lastl = m
        m = mIRV(B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0, f1 = int(facstarts[unit]), int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf>0:
                nfactrials += 1
                # here comes the logics:
                # consider all possible rankings:
                faction = arange(f0, f1)
                ulsum = evaluations(m, u_, ut_, faction).sum()
                bestB = B[f0:f1, :].copy()
                bestulsum = ulsum
                hasmoved = False
                for permi in range(permutations.shape[0]):
                    perm = permutations[permi,:]#.astype(int32)
                    Bcand = perm.copy() #array(perm)
#                    print(B.shape, f0,f1, Bcand.shape)
                    B[f0:f1, :] = Bcand
#                    for f01 in arange(f0,f1): B[f01, :] = Bcand
                    # tally anew:
                    newl = mIRV(B)
                    newulsum = evaluations(newl, u_, ut_, faction).sum()
                    if newulsum > bestulsum:
                        bestulsum = newulsum
                        bestB = Bcand.reshape((1,noptions))
                        hasmoved = True
                B[f0:f1, :] = bestB
#                for f01 in arange(f0,f1): B[f01, :] = bestB
                if hasmoved: nfacmoves += 1
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                x = int(choiceunif(arange(noptions))[0])
                Bi = B[i,:].flatten()
                wh = where(Bi==x)[0]
                if len(wh) == 0:
                    xpos = int(choiceunif(arange(where(Bi==noptions)[0][0] + 1))[0])
                    if xpos > 0: newB[i, :xpos] = Bi[:xpos]
                    newB[i, xpos] = x
                    if xpos < noptions-1: newB[i, xpos+1:] = Bi[xpos:-1]
                else:
                    oldxpos = wh[0]
                    if Bi[-1] == noptions:  # partial ranking
                        xpos = int(choiceunif(arange(where(Bi==noptions)[0][0]))[0])
                    else:  # full ranking
                        xpos = int(choiceunif(arange(noptions))[0])
                    if xpos == oldxpos: 
                        newB[i,:] = Bi
                    elif xpos < oldxpos:
                        if xpos > 0: newB[i, :xpos] = Bi[:xpos]
                        newB[i, xpos] = x
                        newB[i, xpos+1:oldxpos+1] = Bi[xpos:oldxpos]
                        if oldxpos < noptions-1: newB[i, oldxpos+1:] = Bi[oldxpos+1:]
                    else:
                        if oldxpos > 0: newB[i,:oldxpos] = Bi[:oldxpos]
                        newB[i, oldxpos:xpos] = Bi[oldxpos+1:xpos+1]
                        newB[i, xpos] = x
                        if xpos < noptions-1: newB[i, xpos+1:] = Bi[xpos+1:]
        # tally anew:
        newl = mIRV(newB)
        ul = evaluations(m, u_, ut_, Tvoters)
        newul = evaluations(newl, u_, ut_, Tvoters)
        for ipos in range(nTvoters):
            i = Tvoters[ipos]
            fakui = zeros(noptions+1)
            fakui[newB[i, :]] = arange(noptions,0,-1)
            newrevs = reversals(fakui,u_[i,:])
            if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                    # new ballot is less sincere than old: 
                                    revs[i] < newrevs
                                    ): 
                newB[i] = B[i] # revert modification
                nreverts += 1
            else: 
                B[i] = newB[i] # keep modification
                revs[i] = newrevs
                nkeeps += 1
            # now newB == B
#    assert all(array([freqs(noptions+1,Bi)[:-1] for Bi in B]).max(axis=1) == 1)
    # final result
    m = mIRV(B)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration
        
@njit0 
def interactive_SC(u_,ut_,B0,sincereB,Tvoters,Fvoters,facsizes,facstarts,facu,permutations):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    revs = arange(nvoters)
    for i in range(nvoters):
        fakui = -B[i,:]
        revs[i] = reversals(fakui,u_[i,:])
    lchangebyiteration = zeros(T)
    m = mCondorcet(B0)
    for r2 in range(T):
        lastl = m
        m = mCondorcet(B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0, f1 = int(facstarts[unit]), int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf>0:
                nfactrials += 1
                # here comes the logics:
                # consider all possible rankings:
                faction = arange(f0, f1)
                ulsum = evaluations(m, u_, ut_, faction).sum()
                bestB = B[f0:f1, :].copy()
                bestulsum = ulsum
                hasmoved = False
                for permi in range(permutations.shape[0]):
                    perm = permutations[permi,:]
                    Bcand = perm.copy() #array(perm)
                    B[f0:f1, :] = Bcand
                    # tally anew:
                    newl = mCondorcet(B)
                    newulsum = evaluations(newl, u_, ut_, faction).sum()
                    if newulsum > bestulsum:
                        bestulsum = newulsum
                        bestB[:,:] = Bcand.reshape((1,noptions))
                        hasmoved = True
                B[f0:f1, :] = bestB
                if hasmoved: nfacmoves += 1
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                x = int(choiceunif(arange(noptions))[0])
                xrank = int(choiceunif(arange(noptions + 1))[0])
                newB[i, x] = xrank
        # tally anew:
        newl = mCondorcet(newB)
        ul = evaluations(m, u_, ut_, Tvoters)
        newul = evaluations(newl, u_, ut_, Tvoters)
        for ipos in range(nTvoters):
            i = Tvoters[ipos]
            fakui = -newB[i, :]
            newrevs = reversals(fakui,u_[i,:])
            if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                    # new ballot is less sincere than old: 
                                    revs[i] < newrevs
                                    ): 
                newB[i] = B[i] # revert modification
                nreverts += 1
            else: 
                B[i] = newB[i] # keep modification
                revs[i] = newrevs
                nkeeps += 1
            # now newB == B
#    assert all(array([freqs(noptions+1,Bi)[:-1] for Bi in B]).max(axis=1) == 1)
    # final result
    m = mCondorcet(B)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration
        
@njit0 
def interactive_fcrb(u_,ut_,B0,sincereB,Tvoters,Fvoters,facsizes,facstarts,facu):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    lchangebyiteration = zeros(T)
    m = mFCRB(noptions,B0)
    for r2 in range(T):
        lastl = m
        m = mFCRB(noptions,B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0, f1 = int(facstarts[unit]), int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf>0:
                nfactrials += 1
                # here comes the logics:
                faction = arange(f0, f1)
                ulsum = evaluations(m, u_, ut_, faction).sum()
                bestB = B[f0:f1,:].copy()
                bestulsum = ulsum
                hasmoved = False
                # try all combinations of sincere fav. and any cons.:
                B[f0:f1,0] =  sincereB[f0:f1,0]
                for cons in range(noptions):
                    B[f0:f1, 1] = cons
                    # tally anew:
                    newl = mFCRB(noptions,B)
                    newulsum = evaluations(newl, u_, ut_, faction).sum()
                    if newulsum > bestulsum:
                        bestulsum = newulsum
                        bestB = B[f0:f1,:].copy()
                        hasmoved = True
                B[f0:f1,:] = bestB
                if hasmoved: nfacmoves += 1
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                x = int(choiceunif(arange(noptions))[0])
                pos = int(choiceunif(arange(2))[0])
                newB[i, pos] = x
        # tally anew:
        newl = mFCRB(noptions,newB)
        ul = evaluations(m, u_, ut_, Tvoters)
        newul = evaluations(newl, u_, ut_, Tvoters)
        for ipos in range(nTvoters):
            i = Tvoters[ipos]
            if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                    # new ballot is less sincere than old: 
                                    u_[i,newB[i,0]] < u_[i,B[i,0]]
                                    ): 
                newB[i] = B[i] # revert modification
                nreverts += 1
            else: 
                B[i] = newB[i] # keep modification
                nkeeps += 1
            # now newB == B
    # final result
    m = mFCRB(noptions,B)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration
        
@njit0
def interactive_fcrbr(u_,ut_,B0,sincereB,Tvoters,Fvoters,facsizes,facstarts,facu):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    lchangebyiteration = zeros(T)
    m = mFCRBR(B0)
    for r2 in range(T):
        lastl = m
        m = mFCRBR(B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0, f1 = int(facstarts[unit]), int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf>0:
                nfactrials += 1
                # here comes the logics:
                faction = arange(f0, f1)
                ulsum = evaluations(m, u_, ut_, faction).sum()
                bestB = B[f0:f1,:].copy()
                bestulsum = ulsum
                hasmoved = False
                # try all combinations of sincere ratings and any fav. and cons.:
                B[f0:f1, 2:] = sincereB[f0:f1, 2:].copy()
                for fav in range(noptions):
                    B[f0:f1, 0] = fav
                    for cons in range(noptions):
                        B[f0:f1, 1] = cons
                        # tally anew:
                        newl = mFCRBR(B)
                        newulsum = evaluations(newl, u_, ut_, faction).sum()
                        if newulsum > bestulsum:
                            bestulsum = newulsum
                            bestB = B[f0:f1,:].copy()
                            hasmoved = True
                B[f0:f1,:] = bestB
                if hasmoved: nfacmoves += 1
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                x = int(choiceunif(arange(noptions))[0])
                pos = int(choiceunif(arange(3))[0])
                if pos == 2:
                    newB[i, 2 + x] = random.rand() * 100.
                else:
                    newB[i, pos] = x
        # tally anew:
        newl = mFCRBR(newB)
        ul = evaluations(m, u_, ut_, Tvoters)
        newul = evaluations(newl, u_, ut_, Tvoters)
        for ipos in range(nTvoters):
            i = Tvoters[ipos]
            if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                    # new ballot is less sincere than old: 
                                    u_[i,int(newB[i,0])] <= u_[i,int(B[i,0])] 
                                    and
                                    sum((newB[i,2:] - sincereB[i,2:])**2) >= sum((B[i,2:] - sincereB[i,2:])**2)
                                    and not (
                                             u_[i,int(newB[i,0])] == u_[i,int(B[i,0])]
                                             and
                                             sum((newB[i,2:] - sincereB[i,2:])**2) == sum((B[i,2:] - sincereB[i,2:])**2)
                                             )
                                    ): 
                newB[i] = B[i] # revert modification
                nreverts += 1
            else: 
                B[i] = newB[i] # keep modification
                nkeeps += 1
            # now newB == B
    # final result
    m = mFCRBR(B)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration
        
#@njit
def interactive_NL(u_,ut_,B0,sincereB,Tvoters,Fvoters,facsizes,facstarts,facu):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    lchangebyiteration = zeros(T)
    m = mNL(B0)
    for r2 in range(T):
        change = False
        lastl = m
        m = mNL(B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        ul = evaluations(m,u_,ut_,Tvoters)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0,f1 = int(facstarts[unit]),int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf > 0:
                nfactrials += 1
                # here comes the logics:
                commonB0 = (100-2e-5)/100 * mean(sincereB[f0:f1,:],axis=0) + 1e-5 # so that no zeros or hundreds occur
#                print(sincereB[f0:f1,:].min(),sincereB[f0:f1,:].max(),commonB0.min(),commonB0.max())
                newB = B.copy()
#                def fac_target(lncommonB):
#                    newB[f0:f1,:] = commonB = exp(lncommonB)
                def fac_target(logitcommonB):
                    newB[f0:f1,:] = commonB = 100 / (1 + exp(-logitcommonB))
                    m = mNL(newB)
                    val = - sum(evaluations(m,u_,ut_,arange(f0,f1))) # since we minimize
                    assert not isnan(val), str((logitcommonB, m, val))
                    #print(min(commonB),max(commonB),val)
                    return val
#                print("fac_target...")
                res = minimize(fac_target,
#                       log(commonB0),
                       log(commonB0/(100-commonB0)), # logit
#                       method = 'SLSQP',
                       method = 'COBYLA', # COBYLA!
                       tol = 1e-1,
                       options = {"maxiter":200,
                                  #"disp":1
                                  },
                       )
#                print("...done")
                if (res["success"] == True 
                    or res["status"] == 2):  # accept max. iterations reached
#                    B[f0:f1,:] = exp(res["x"])
                    newBfac = 100 / (1 + exp(-res["x"])) # logistic = inverse of logit
                    if ((B[f0:f1,:] - newBfac)**2).sum() > 0:
                        B[f0:f1,:] = newBfac
                        change = True
                    nfacmoves += 1        
                else:
                    print("UPPSALA",res)
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                x = int(choiceunif(arange(noptions))[0])
                newB[i,x] = 100 * random.rand()
                change = True
        if change:
            # tally anew:
            newl = mNL(newB)
            newul = evaluations(newl,u_,ut_,Tvoters)
            for ipos in range(nTvoters):
                i = Tvoters[ipos]
                if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                        # new ballot is less sincere than old: 
                                        sum((newB[i] - sincereB[i])**2) > sum((B[i] - sincereB[i])**2)
                                        ): 
                    newB[i] = B[i] # revert modification
                    nreverts += 1
                else: 
                    B[i] = newB[i] # keep modification
                    nkeeps += 1
                # now newB == B
    # final result
    m = mNL(B)
    ul = evaluations(m,u_,ut_,Tvoters)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration
        
@njit
def interactive_maxparc(u_,ut_,B0,Tvoters,Fvoters,facsizes,facstarts,facu):
    nvoters,noptions = u_.shape
    nTvoters = Tvoters.size
    # initial ballots:
    B = B0.copy()
    newB = B.copy()
    # interactive rounds:
    nfacmoves = nfactrials = nreverts = nkeeps = 0
    revs = arange(nvoters)
    for i in range(nvoters): revs[i] = reversals(B[i,:],u_[i,:])
    lchangebyiteration = zeros(T)
    m, bestascores = mMaxParC(B0)
    for r2 in range(T):
        lastl = m
        m, bestascores = mMaxParC(B)
        lchangebyiteration[r2] = mean((lastl-m)**2)
        # let some faction adjust their ballots:
        if random.rand() < pfac:
            unit = int(choiceunif(arange(noptions))[0]) # choose a faction
            f0,f1 = int(facstarts[unit]),int(facstarts[unit+1])
            nf = int(facsizes[unit])
            if nf > 0:
                nfactrials += 1
                # here comes the logics:
                bestu = sum(evaluations(m,u_,ut_,arange(f0,f1)))
                bestAcode = -1
                for Acode in range(2**noptions):
                    # try rating A members at 100, rest at 0:
                    for x in range(noptions): newB[f0:f1,x] = 100. if Acode & (1<<x) else 0.
                    newl, newascores = mMaxParC(newB)
                    newu = sum(evaluations(newl,u_,ut_,arange(f0,f1)))
                    if newu > bestu:
                        bestu = newu
                        bestAcode = Acode 
                        bestascores = newascores
                if bestAcode != -1:
                    for x in range(noptions):
                        if bestAcode & (1<<x):
                            for i in range(f0,f1): B[i,x] = max(100*(1 - 1.*bestascores[x]/nvoters),B0[i,x])
                        else:
                            for i in range(f0,f1): B[i,x] = min(99*(1 - 1.*bestascores[x]/nvoters),B0[i,x])
                    nfacmoves += 1
        # let each trial-and-error voter modify their ballot with some probability:
        newB = B.copy()
        for i in Tvoters:
            if random.rand() < ptry:
                # random modification:
                x = int(choiceunif(arange(noptions))[0])
                newB[i,x] = random.rand() * 100.
        # tally anew:
        newl, dummy = mMaxParC(newB)
        ul = evaluations(m,u_,ut_,Tvoters)
        newul = evaluations(newl,u_,ut_,Tvoters)
        for ipos in range(nTvoters):
            i = Tvoters[ipos]
            newrevs = reversals(newB[i,:],u_[i,:])
            if newul[ipos] < ul[ipos] or (newul[ipos] == ul[ipos] and
                                    # new ballot is less sincere than old: 
                                    revs[i] < newrevs
                                    ): 
                newB[i,:] = B[i,:] # revert modification
                nreverts += 1
            else: 
                B[i,:] = newB[i,:] # keep modification
                revs[i] = newrevs
                nkeeps += 1
            # now newB == B

    # final result
    m, dummy = mMaxParC(B)
    if nfactrials == 0: nfactrials = 1
    if nkeeps + nreverts == 0: nreverts = 1
    return m, nfacmoves*1./nfactrials, nkeeps*1./(nkeeps+nreverts), lchangebyiteration, B



###### MAIN PROGRAM ######

sh.mkdir("-p", results_dir + "/plots")

# run Monte Carlo simulations:

print(parallelization_rank,"%018.7f"%time()," running",mcn,"simulations")

ndifferent = nsame = 0.

def relval(v,a,b):
    return (v-a)/(b-a) #min(2,max(-1,(v-a)/(b-a)))

sumlchangebyiteration = zeros(T)

for mci in range(mcn):
    
    # prepare results row:
    res = {"pr":parallelization_rank, "mci":mci}
    
    # pick parameters:
    res["nvoters"] = nvoters = choice(nvoterss)
    res["noptions"] = noptions = choice(noptionss)
    res["npolls"] = npolls = choice(npollss)
    res["umodel"] = umodel = choice(umodels)
    res["scenario"] = scenario = choice(scenarios)
    res["riskmodel"] = riskmodel = choice(riskmodels)

    print(parallelization_rank,"%018.7f"%time(),"  sim",mci,", nvoters",nvoters,", noptions",noptions,", umodel",umodel,", riskmodel",riskmodel,", npolls",npolls,", scenario",scenario)
    
    # setup decision problem:
    pb = pbtypes[scenario]
    pu = putypes[riskmodel]
    bt_,nfactional = draw_btypes(nvoters,p=array([pb["F"],pb["H"],pb["L"],pb["S"],pb["T"]])) # called tau in the SI  
    ut_ = draw_utypes(nvoters,pu)    
    xi,sigma,block,block1,u_,u1_,eta_,eta1_,facsizes,facsizes1,facstarts,facstarts1,facu,facu1 = \
        generate_utility(nvoters,noptions,umodel,nfactional,res)

    # simulate with and without compromise option present:
    for with_compromise in [0,1] if do_compromises else [0]: # this order!
                
#        if with_compromise and umodel in ["unif","BM"]: continue
        res["with_compromise"] = with_compromise

        if with_compromise: 
#            noptions += 1
#            res["noptions"] = noptions
            u_,eta_,facsizes,facstarts,facu = u1_,eta1_,facsizes1,facstarts1,facu1
            print(parallelization_rank,"%018.7f"%time(),"  same situation with option 0 replaced by a compromise option:")
        
        if xi is not None: 
            xi = xi[:noptions,:]
            sigma = sigma[:noptions]

        # find options that maximize welfare measures:
        if not with_compromise:
            lowWutil, highWutil = minmaxWutil(u_)
            lowWgini, highWgini = minmaxWgini(u_)
            lowWegal, highWegal = minmaxWegal(u_)
            # otherwise take the values of the version without compromise!
                
        Lvoters = array(where(bt_ == "L")[0])
        Tvoters = array(where(bt_ == "T")[0])
        Svoters = array(where(bt_ == "S")[0])
        Fvoters = array(where(bt_ == "F")[0])
        Hvoters = array(where(bt_ == "H")[0])

        # simulate polling rounds:
        sincerepollvoters = concatenate((Svoters,Tvoters))
        heuristicpollvoters = concatenate((Hvoters,Fvoters))        
        pconverged = aconverged = nan
        for r in range(npolls):
            if r==0:
                # get initial plurality and approval ballots:
                pballots = sincerefav(u_)
                m = repeat(1./noptions,noptions)
                ul_ = evaluations(m,u_,ut_,arange(u_.shape[0])).reshape((-1,1))
                aballots = sincerea(u_,ul_)
                for i in Lvoters:
                    aballots[i,:] = zeros(noptions)
                    aballots[i,pballots[i]] = 1
            else:
                # get sincere approval ballots and heuristic plurality and approval ballots based on last poll:
                if isnan(pconverged): 
                    pballots[heuristicpollvoters] = heuristicp(u_,pscores,heuristicpollvoters)
                if isnan(aconverged): 
                    m = pscores*1. / sum(pscores)
                    ul_ = evaluations(m,u_,ut_,arange(u_.shape[0])).reshape((-1,1))
                    aballots[Svoters,:] = sincerea(u_,ul_)[Svoters,:]
                    aballots[heuristicpollvoters,:] = heuristica(u_,ascores,heuristicpollvoters)
            # get plurality and approval scores:
            if isnan(pconverged): 
                pscores = getpscores(noptions,pballots).astype("int")
                if r==0:
                    sl = pscores*1. / nvoters # sincere benchmark lottery
                    sul_ = evaluations(sl,u_,ut_,arange(u_.shape[0])).reshape((-1,1))
                    res["compromise_potential"] = sincerea(u_,sul_).mean()
                    print(parallelization_rank,"%018.7f"%time(),"   compromise potential:",res["compromise_potential"])
                elif all(pballots == lastpballots): 
                    pconverged = r
                lastpballots = pballots.copy()
            if isnan(aconverged): 
                ascores = getascores(aballots).astype("int")
                if r > 0 and all(aballots == lastaballots): aconverged = r
                else: lastaballots = aballots.copy()
            if r == 0:
                print(parallelization_rank,"%018.7f"%time(),"   initial plurality and approval poll scores:",pscores,ascores)
            if not isnan(pconverged) and not isnan(aconverged): break
                        
        aranking = argsort1D(-ascores)
        print(parallelization_rank,"%018.7f"%time(),"   no. rounds after which plurality and approval polls converged:", pconverged, aconverged)
        print(parallelization_rank,"%018.7f"%time(),"   final   plurality and approval poll scores:",pscores,ascores)
        print(parallelization_rank,"%018.7f"%time(),"   options in order of descending approval poll score:",aranking)

        res["ppollconverged"] = pconverged
        res["apollconverged"] = aconverged
                 
        # find all sincere ballots:
        (psincere,asincere,rvsincere,
         irvsincere,scsincere,
         rbsincere,fcrbsincere,fcrbrsincere,
         nlsincere,mpsincere) = sincereall(u_,ut_,pscores,ascores,pb["L"])
        
        m = pscores*1. / nvoters
        ul = evaluations(m,u_,ut_,arange(nvoters))

        # initial ballots:
        rvballots = zeros((nvoters,noptions))
        irvballots = zeros((nvoters,noptions),"int64")
        scballots = zeros((nvoters,noptions),"int64")
        rbballots = zeros(nvoters,"int64")
        fcrbballots = zeros((nvoters,2),"int64")
        fcrbrballots = zeros((nvoters, 2 + noptions))
        nlballots = zeros((nvoters,noptions))
        maxparcballots = zeros((nvoters,noptions))
        for i in Lvoters:
            # bullet voting for favourite:
            rvballots[i,pballots[i]] = fcrbrballots[i,2 + pballots[i]] = \
                nlballots[i,pballots[i]] = maxparcballots[i,pballots[i]] = 100.
            fcrbballots[i,:2] = fcrbrballots[i,:2] = rbballots[i] = pballots[i]
            irvballots[i,0] = scballots[i,0] = pballots[i]
            irvballots[i,1:] = scballots[i,1:] = noptions
        for i in sincerepollvoters:
            rvballots[i,:] = rvsincere[i,:]
            irvballots[i,:] = irvsincere[i,:]
            scballots[i,:] = scsincere[i,:]
            rbballots[i] = rbsincere[i]
            fcrbballots[i,:] = fcrbsincere[i,:]
            fcrbrballots[i,:] = fcrbrsincere[i,:]
            nlballots[i,:] = nlsincere[i,:]
            maxparcballots[i,:] = mpsincere[i,:]
        for i in heuristicpollvoters:
            # Range:
            rvballots[i,:] = 100. * aballots[i,:]
            # IRV:
            y = aranking[0]
            for pos, x in enumerate(aranking[1:]):
                if u_[i,x] > u_[i,y]:
                    irvballots[i,pos] = x
                else:
                    irvballots[i,pos] = y
                    y = x
            irvballots[i,-1] = y
            # Simple Condorcet:
            scballots[i, argsort1D(-u_[i, :])] = arange(noptions) 
            y, z = aranking[:2]
            first, second = (z, y) if u_[i, y] < u_[i, z] else (y, z)
            scballots[i, where(u_[i, :] >= u_[i, first])[0]] = 0
            scballots[i, where(u_[i, :] <= u_[i, second])[0]] = noptions
            # RB etc.:
            rbballots[i] = rbsincere[i]
            fcrbballots[i,:] = fcrbsincere[i,:]
            fcrbrballots[i,:] = fcrbrsincere[i,:]
            # Nash:
            if ut_[i] == 1: # LCP
                w,order = LCPweightsnorder(m,u_[i,:])
                rell = zeros(noptions)
                rell[order] = w*(u_[i,order] - ul[i])
            elif ut_[i] == 2: # HCP
                w,order = HCPweightsnorder(m,u_[i,:])
                rell = zeros(noptions)
                rell[order] = w*(u_[i,order] - ul[i])
            else: # EUT 
                rell = m*(u_[i,:] - ul[i])
            minrell = min(rell)
            nlballots[i,:] = 100.*(1. - rell / minrell) if minrell != 0 else 100.
            # MaxParC:
            maxparcballots[i,:] = mpsincere[i,:]
            for x in range(noptions):
                off = 100. * ascores[x] / nvoters
                if aballots[i,x] == 1 and 101-off > maxparcballots[i,x]:
                    maxparcballots[i,x] = min(100,101-off)
                elif aballots[i,x] == 0 and 99-off < maxparcballots[i,x]:
                    maxparcballots[i,x] = max(0,99-off)

        # simulate a separate election under each method:
        vbym = {}
        maxWutil,argmaxWutil = -inf,""
        maxWgini,argmaxWgini = -inf,""
        maxWegal,argmaxWegal = -inf,""
        if "SC" in methodnames or "IRV" in methodnames:
            perms = array(list(permutations(range(noptions))))
        for methodname in methodnames:
            print(parallelization_rank,"%018.7f"%time(),"  ",methodname,":")
            if methodname == "PV":
                linitial = mPlurality(noptions,pballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration = \
                    interactive_plurality(u_,ut_,pballots,psincere,Tvoters,Fvoters,facsizes,facstarts,facu)
            elif methodname == "AV":
                linitial = mApproval(aballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration = \
                    interactive_approval(u_,ut_,aballots,asincere,Tvoters,Fvoters,facsizes,facstarts,facu)
            elif methodname == "RV":
                linitial = mRange(rvballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration = \
                    interactive_range(u_,ut_,rvballots,rvsincere,Tvoters,Fvoters,facsizes,facstarts,facu)
            elif methodname == "IRV":
                linitial = mIRV(irvballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration = \
                    interactive_IRV(u_,ut_,irvballots,irvsincere,Tvoters,Fvoters,facsizes,facstarts,facu,
                                    perms)
            elif methodname == "SC":
                linitial = mCondorcet(scballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration = \
                    interactive_SC(u_,ut_,scballots,scsincere,Tvoters,Fvoters,facsizes,facstarts,facu,
                                    perms)
            elif methodname == "RB":
                linitial = lfinal = mRB(noptions,rbballots)
                res["moverate_"+methodname] = 0
                res["keeprate_"+methodname] = 0
                lchangebyiteration = zeros(T)
            elif methodname == "FC":
                linitial = mFCRB(noptions,fcrbballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration = \
                    interactive_fcrb(u_,ut_,fcrbballots,fcrbsincere,Tvoters,Fvoters,facsizes,facstarts,facu)
            elif methodname == "RFC":
                linitial = mFCRBR(fcrbrballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration = \
                    interactive_fcrbr(u_,ut_,fcrbrballots,fcrbrsincere,Tvoters,Fvoters,facsizes,facstarts,facu)
            elif methodname == "NL":
                linitial = mNL(nlballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration = \
                    interactive_NL(u_,ut_,nlballots,nlsincere,Tvoters,Fvoters,facsizes,facstarts,facu)
            elif methodname == "MPC":
                linitial, dummy = mMaxParC(maxparcballots)
                lfinal,res["moverate_"+methodname],res["keeprate_"+methodname],lchangebyiteration,finalB = \
                    interactive_maxparc(u_,ut_,maxparcballots,Tvoters,Fvoters,facsizes,facstarts,facu)
                if any(isnan(lfinal)): print("OOPS1:",methodname,lfinal)
                if do_plots:
                    votes = mMaxParC_votes(finalB)
                    plotspace(repeat=True, votes=votes, save = results_dir + "/" + plotname + str(parallelization_rank) + "_"+str(mci)+"_MPC.pdf")
            ch = res["interactivechanged_"+methodname] = 1*(not all(linitial == lfinal))
            if ch:
                print(parallelization_rank,"%018.7f"%time(),"    initial   result",linitial)
                print(parallelization_rank,"%018.7f"%time(),"    final     result",lfinal)
                ndifferent += 1.
            else:
                print(parallelization_rank,"%018.7f"%time(),"    unchanged result",linitial)
                nsame += 1.
            print(parallelization_rank,"%018.7f"%time(),"    moverate,keeprate:",res["moverate_"+methodname],res["keeprate_"+methodname])
            
            sumlchangebyiteration += lchangebyiteration
                
            # entropies:
            res["Eshannon_initial_"+methodname] = Eshannon(linitial)
            res["Eshannon_final_"+methodname] = Eshannon(lfinal)
            res["Erenyi2_initial_"+methodname] = Erenyi2(linitial)
            res["Erenyi2_final_"+methodname] = Erenyi2(lfinal)
            # welfares and inequalities:
            vinitial = evaluations(linitial,u_,ut_,arange(nvoters))
            sinitial = satisfactions(linitial,u_,ut_,arange(nvoters))
            vbym[methodname] = vfinal = evaluations(lfinal,u_,ut_,arange(nvoters))
            sfinal = satisfactions(lfinal,u_,ut_,arange(nvoters))
            res["Wutil_initial_"+methodname] = Wutil(vinitial)
            thisWutil = res["Wutil_final_"+methodname] = Wutil(vfinal)
            res["Wgini_initial_"+methodname] = Wgini(vinitial)
            thisWgini = res["Wgini_final_"+methodname] = Wgini(vfinal)
#            res["WtheilT_initial_"+methodname] = WtheilT(vinitial)
#            res["WtheilT_final_"+methodname] = WtheilT(vfinal)
            res["Wegal_initial_"+methodname] = Wegal(vinitial)
            thisWegal = res["Wegal_final_"+methodname] = Wegal(vfinal)
            if thisWutil > maxWutil: maxWutil,argmaxWutil = thisWutil,methodname
            elif thisWutil == maxWutil: argmaxWutil += ","+methodname
            if thisWgini > maxWgini: maxWgini,argmaxWgini = thisWgini,methodname
            elif thisWgini == maxWgini: argmaxWgini += ","+methodname
            if thisWegal > maxWegal: maxWegal,argmaxWegal = thisWegal,methodname
            elif thisWegal == maxWegal: argmaxWegal += ","+methodname
            res["relWutil_initial_"+methodname] = relval(res["Wutil_initial_"+methodname],lowWutil,highWutil)
            res["relWutil_final_"+methodname] = relval(thisWutil,lowWutil,highWutil)
            res["relWgini_initial_"+methodname] = relval(res["Wgini_initial_"+methodname],lowWgini,highWgini)
            res["relWgini_final_"+methodname] = relval(thisWgini,lowWgini,highWgini)
##            res["relWtheilT_initial_"+methodname] = (WtheilT(ulEUinitial) - bmWtheilT) / (bestWtheilT - bmWtheilT)
##            res["relWtheilT_final_"+methodname] = (WtheilT(ulEUfinal) - bmWtheilT) / (bestWtheilT - bmWtheilT)
            res["relWegal_initial_"+methodname] = relval(res["Wegal_initial_"+methodname],lowWegal,highWegal)
            res["relWegal_final_"+methodname] = relval(thisWegal,lowWegal,highWegal)
#            res["Igini_initial_"+methodname] = Igini(vinitial)
#            res["Igini_final_"+methodname] = Igini(vfinal)
#            res["ItheilT_initial_"+methodname] = ItheilT(vinitial)
#            res["ItheilT_final_"+methodname] = ItheilT(vfinal)
            res["pcompromise_initial_"+methodname] = linitial[0] if with_compromise else nan
            res["pcompromise_final_"+methodname] = lfinal[0] if with_compromise else nan
            res["maxprob_initial_"+methodname] = linitial.max()
            res["maxprob_final_"+methodname] = lfinal.max()

            for s in stypes:
                this_s_voters = array(where(bt_ == s)[0])
                assert sinitial[this_s_voters].size == this_s_voters.size
                res["avgsatisfaction_initial_" + s + "_" + methodname] = sinitial[this_s_voters].mean()
                res["avgsatisfaction_final_" + s + "_" + methodname] = sfinal[this_s_voters].mean()
                
        for m1 in methodnames:
            for m2 in methodnames:
                if m1 != m2:
                    res["pctprefer_"+m1+"_over_"+m2] = mean(vbym[m1] > vbym[m2])
        
        res["bestWutil"] = argmaxWutil
        res["bestWgini"] = argmaxWgini
        res["bestWegal"] = argmaxWegal
                    
        # store results by appending to existing csv:
        results.iloc[0] = res
        results.to_csv(csvname, 
               index = False,
               header = False,
               mode="a"
               )
        
#        printmem()

print(parallelization_rank,"%018.7f"%time()," ratio different:",ndifferent/(ndifferent+nsame))

# save results and finish:

print(parallelization_rank,"%018.7f"%time()," saving results to",csvname)
#results.to_csv(csvname, 
#               header = (parallelization_rank == 0), # only first slave's csv contains header with column names
#               index = False
#               )


print(parallelization_rank,"%018.7f"%time(),"finished after",time() - time_started,"seconds")

#figure()    
#plot(sumlchangebyiteration / mcn)
#savefig(jobname + str(parallelization_rank) + ".pdf")

quit()
