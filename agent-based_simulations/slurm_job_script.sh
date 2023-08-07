#!/bin/bash

#SBATCH --qos=short
#SBATCH --job-name=maxparc
#SBATCH --account=gane
#SBATCH --output=test-%j.out
#SBATCH --error=test-%j.err
#SBATCH --workdir=/p/tmp/heitzig/

module load anaconda/2020.11
conda activate /p/projects/ou/labs/gane/maxparc/paper_revision/conda_env
python -u /p/projects/ou/labs/gane/maxparc/paper_revision/vodle/agent-based_simulations/src/maxparc_paper_simulations.py
