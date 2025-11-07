"""
Basic tests for the Rock-Paper-Scissors environment
"""
import sys
sys.path.insert(0, '..')

from environments.rps_v2 import env, parallel_env, ROCK, PAPER, SCISSORS, NO_MOVE

def test_parallel_env_creation():
    """Test that parallel environment can be created"""
    penv = parallel_env(render_mode=None)
    assert penv is not None
    assert len(penv.possible_agents) == 2
    print("✓ test_parallel_env_creation passed")

def test_env_creation():
    """Test that wrapped environment can be created"""
    game = env(render_mode=None)
    assert game is not None
    print("✓ test_env_creation passed")

def test_reset():
    """Test environment reset"""
    penv = parallel_env(render_mode=None)
    observations, infos = penv.reset(seed=42)
    assert len(observations) == 2
    assert len(infos) == 2
    assert len(penv.agents) == 2
    print("✓ test_reset passed")

def test_step():
    """Test environment step"""
    penv = parallel_env(render_mode=None)
    penv.reset(seed=42)
    
    actions = {agent: ROCK for agent in penv.agents}
    obs, rewards, terminations, truncations, infos = penv.step(actions)
    
    assert len(obs) == 2
    assert len(rewards) == 2
    assert len(terminations) == 2
    assert len(truncations) == 2
    assert len(infos) == 2
    print("✓ test_step passed")

def test_reward_map():
    """Test reward logic"""
    penv = parallel_env(render_mode=None)
    penv.reset(seed=42)
    
    # Test tie
    actions = {penv.agents[0]: ROCK, penv.agents[1]: ROCK}
    _, rewards, _, _, _ = penv.step(actions)
    assert rewards[penv.agents[0]] == 0
    assert rewards[penv.agents[1]] == 0
    
    # Test win/loss
    penv.reset(seed=42)
    actions = {penv.agents[0]: ROCK, penv.agents[1]: SCISSORS}
    _, rewards, _, _, _ = penv.step(actions)
    assert rewards[penv.agents[0]] == 1
    assert rewards[penv.agents[1]] == -1
    
    print("✓ test_reward_map passed")

def test_spaces():
    """Test observation and action spaces"""
    penv = parallel_env(render_mode=None)
    penv.reset(seed=42)
    
    for agent in penv.agents:
        obs_space = penv.observation_space(agent)
        act_space = penv.action_space(agent)
        assert obs_space.n == 4  # NO_MOVE, ROCK, PAPER, SCISSORS
        assert act_space.n == 3  # ROCK, PAPER, SCISSORS
    
    print("✓ test_spaces passed")

def run_all_tests():
    """Run all tests"""
    print("Running tests for rps_v2 environment...")
    print("-" * 50)
    
    test_parallel_env_creation()
    test_env_creation()
    test_reset()
    test_step()
    test_reward_map()
    test_spaces()
    
    print("-" * 50)
    print("✅ All tests passed!")

if __name__ == "__main__":
    run_all_tests()
