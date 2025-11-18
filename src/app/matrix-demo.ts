/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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
*/

/**
 * Matrix Integration Demo - Phase 1
 * 
 * This file demonstrates how to use the MatrixService for testing purposes.
 * It's NOT part of the production code - it's for developers to test the Matrix integration.
 * 
 * Usage (from browser console after app loads):
 * 1. Open browser dev tools (F12)
 * 2. Run: testMatrixIntegration()
 */

import { MatrixService } from './matrix.service';
import { Storage } from '@ionic/storage-angular';
import { Logger, LoggingService } from 'ionic-logging-service';

/**
 * Demo function to test Matrix integration
 * This would be called manually from browser console or a test page
 */
export async function demoMatrixIntegration(
  matrixService: MatrixService,
  logger: Logger
): Promise<void> {
  logger.info('=== Starting Matrix Integration Demo ===');
  
  try {
    // Step 1: Initialize the client
    logger.info('Step 1: Initializing Matrix client...');
    await matrixService.initClient();
    
    if (!matrixService.isLoggedIn()) {
      logger.info('Not logged in. Attempting registration...');
      
      // Step 2: Register a test user
      const testEmail = `test_${Date.now()}@example.com`;
      const testPassword = 'TestPassword123!';
      
      logger.info(`Step 2: Registering user: ${testEmail}`);
      try {
        await matrixService.register(testEmail, testPassword);
        logger.info('✓ Registration successful!');
      } catch (error) {
        logger.warn('Registration failed, trying login instead...', error);
        await matrixService.login(testEmail, testPassword);
        logger.info('✓ Login successful!');
      }
    } else {
      logger.info('✓ Already logged in!');
    }
    
    // Step 3: Get user info
    const userId = matrixService.getUserId();
    logger.info(`Step 3: Current user ID: ${userId}`);
    
    // Step 4: Create a test room
    logger.info('Step 4: Creating a test room...');
    const roomId = await matrixService.createRoom({
      name: 'Vodle Test Room',
      topic: 'Testing Matrix integration',
      preset: 'private_chat' as any,
      initial_state: [
        {
          type: 'm.room.encryption',
          state_key: '',
          content: {
            algorithm: 'm.megolm.v1.aes-sha2'
          }
        }
      ]
    });
    logger.info(`✓ Room created: ${roomId}`);
    
    // Step 5: Send a state event
    logger.info('Step 5: Sending a state event...');
    await matrixService.sendStateEvent(
      roomId,
      'm.room.vodle.test',
      { message: 'Hello from Vodle!', timestamp: Date.now() },
      ''
    );
    logger.info('✓ State event sent!');
    
    // Step 6: Read the state event back
    logger.info('Step 6: Reading state event back...');
    const content = matrixService.getStateEvent(roomId, 'm.room.vodle.test', '');
    logger.info('✓ State event content:', content);
    
    logger.info('=== Matrix Integration Demo Complete ===');
    logger.info('All operations successful! ✓');
    
  } catch (error) {
    logger.error('Matrix Integration Demo failed:', error);
    throw error;
  }
}

/**
 * Step-by-step manual testing instructions
 */
export const MATRIX_DEMO_INSTRUCTIONS = `
Matrix Integration Demo - Manual Testing Instructions
======================================================

Prerequisites:
1. Matrix homeserver running on http://localhost:8008
   Run: docker-compose -f docker-compose.matrix.yml up -d
2. Vodle application running (npm start)

Testing Steps:
--------------

1. VERIFY HOMESERVER IS RUNNING:
   Open a terminal and run:
   curl http://localhost:8008/_matrix/client/versions
   
   You should see a JSON response with version information.

2. ENABLE MATRIX BACKEND (Optional for Phase 1):
   Edit src/environments/environment.ts:
   useMatrixBackend: true

3. OPEN BROWSER CONSOLE:
   - Open the application in your browser
   - Press F12 to open Developer Tools
   - Go to Console tab

4. TEST THE MATRIX SERVICE:
   The MatrixService should be available through Angular's dependency injection.
   However, since the UI isn't connected yet, you'll need to access it programmatically.

5. VERIFY IN MATRIX LOGS:
   docker-compose -f docker-compose.matrix.yml logs -f synapse
   
   You should see registration, login, and room creation events.

Expected Results:
-----------------
✓ User registration/login succeeds
✓ Room creation succeeds
✓ State events can be sent and read
✓ No errors in browser console
✓ Matrix logs show the operations

Troubleshooting:
----------------
- If registration fails: Check homeserver.yaml has enable_registration: true
- If connection fails: Verify homeserver is running on port 8008
- If CORS errors: Check homeserver CORS settings (usually fine for localhost)

Phase 1 Note:
-------------
The UI is NOT yet connected to MatrixService. This is expected!
Phase 1 is only the foundation. UI integration comes in Phase 2+.
`;

/**
 * Print demo instructions to console
 */
export function printDemoInstructions(): void {
  console.log(MATRIX_DEMO_INSTRUCTIONS);
}
