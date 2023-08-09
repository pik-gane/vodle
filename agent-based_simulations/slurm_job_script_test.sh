#!/bin/bash

#SBATCH --qos=short
#SBATCH --job-name=maxparc
#SBATCH --account=gane
#SBATCH --output=maxparc-%j.out
#SBATCH --error=maxparc-%j.err
#SBATCH --workdir=/p/projects/ou/labs/gane/maxparc/paper_revision/results
#SBATCH --time=00:01:00

echo "Argument:" 
echo $1
