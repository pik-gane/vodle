# Python Research Modules

This directory contains Python modules used for research purposes related to vodle's multi-agent decision-making experiments.

## Environments

The `environments` directory contains PettingZoo-compatible multi-agent reinforcement learning environments.

### Rock-Paper-Scissors (rps_v2)

A simple two-player Rock-Paper-Scissors game environment implemented using the PettingZoo library.

#### Features:
- Parallel and AEC (Agent Environment Cycle) API support
- Configurable number of iterations (default: 100)
- Standard RPS reward structure
- Human rendering mode support

#### Usage:

```python
from python.environments.rps_v2 import env

# Create environment with wrappers
game = env(render_mode="human")

# Or use raw environment
from python.environments.rps_v2 import raw_env
game = raw_env(render_mode="human")

# Or use parallel environment directly
from python.environments.rps_v2 import parallel_env
game = parallel_env(render_mode="human")
```

## Examples

See the `examples/` directory for usage examples:
- `play_rps.py` - A simple demonstration of the RPS environment

Run an example:
```bash
cd examples
python3 play_rps.py
```

## Testing

Run the test suite:
```bash
cd tests
python3 test_rps_v2.py
```

## Installation

Install the required dependencies:

```bash
pip install -r requirements.txt
```

## Requirements

- Python 3.8+
- gymnasium >= 0.29.0
- numpy >= 1.24.0
- pettingzoo >= 1.24.0
