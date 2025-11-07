"""
Example usage of the Rock-Paper-Scissors environment
"""
import sys
sys.path.insert(0, '..')

from environments.rps_v2 import env, ROCK, PAPER, SCISSORS

def main():
    # Create the environment
    game = env(render_mode="human")
    
    # Reset the environment
    game.reset(seed=42)
    
    print("Starting Rock-Paper-Scissors game...")
    print("-" * 50)
    
    # Play a few rounds
    for i in range(5):
        print(f"\nRound {i + 1}:")
        
        # Get the current agent
        agent = game.agent_selection
        
        # Simple strategy: alternate between rock, paper, scissors
        action = i % 3
        action_name = ["ROCK", "PAPER", "SCISSORS"][action]
        print(f"  {agent} plays {action_name}")
        
        # Take the action
        game.step(action)
    
    print("\n" + "-" * 50)
    print("Game demonstration complete!")

if __name__ == "__main__":
    main()
