import {
  InMemoryBackend,
  init_in_memory_backend
} from "./chunk-ZPE7N4NF.js";
import {
  MigrationService,
  init_migration_service
} from "./chunk-DT2HDFLW.js";
import {
  DataAdapter,
  init_data_adapter_service
} from "./chunk-APZ6T4YC.js";
import {
  MatrixBackend,
  init_matrix_backend
} from "./chunk-D4BX2DV5.js";
import {
  CouchDBBackend,
  init_couchdb_backend
} from "./chunk-XXC2S6M6.js";
import {
  TestBed,
  init_testing,
  waitForAsync
} from "./chunk-KSMDN5RK.js";
import "./chunk-WCO77UR5.js";
import {
  IonicModule,
  init_lazy
} from "./chunk-BLEMCJOU.js";
import "./chunk-JYODAN7K.js";
import "./chunk-HMW3MSDJ.js";
import "./chunk-BPYMCMCI.js";
import "./chunk-DL2EKLCJ.js";
import "./chunk-GMOSWYPY.js";
import "./chunk-QLB7V5XI.js";
import "./chunk-CPN2CPEA.js";
import "./chunk-UYK5QVEZ.js";
import "./chunk-OTRSMIBG.js";
import "./chunk-VQMD36Q3.js";
import "./chunk-62ARMAPG.js";
import "./chunk-LTX35HTQ.js";
import "./chunk-LEFG5EZ6.js";
import "./chunk-Z6RQ22J2.js";
import "./chunk-VEPFSKM7.js";
import "./chunk-URXKFSPR.js";
import "./chunk-ONSJ7667.js";
import "./chunk-DPMEUTWH.js";
import "./chunk-WNLFHCZN.js";
import "./chunk-IXNS4VUW.js";
import "./chunk-AAKC2XIS.js";
import {
  FormsModule,
  init_forms
} from "./chunk-MMJERPYN.js";
import "./chunk-DHXSNOHE.js";
import "./chunk-JJP5VKQW.js";
import "./chunk-QMHGPUGB.js";
import "./chunk-GZCYQ2RJ.js";
import "./chunk-JEJ3RYUQ.js";
import "./chunk-CHXUQIDJ.js";
import "./chunk-A2IUBHOU.js";
import "./chunk-DRVLPRFI.js";
import {
  ChangeDetectionStrategy,
  Component,
  init_core
} from "./chunk-SGQRHDJN.js";
import {
  __decorate,
  init_tslib_es6
} from "./chunk-CGNCHVYB.js";
import {
  environment,
  init_environment
} from "./chunk-CWEVXFNP.js";
import {
  __async,
  __commonJS,
  __esm
} from "./chunk-PKPTYHZH.js";

// angular:jit:template:src/app/migration/migration.page.html
var migration_page_default;
var init_migration_page = __esm({
  "angular:jit:template:src/app/migration/migration.page.html"() {
    migration_page_default = `<!--
(C) Copyright 2015\u20132022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

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
-->

<ion-header>
  <ion-toolbar style="padding-right:11px;">
    <ion-buttons slot="start">
      <ion-menu-button></ion-menu-button>
    </ion-buttons>
    <ion-title>Data Migration</ion-title>
    <ion-thumbnail slot="end">
      <img src="./assets/topright_icon.png" alt="" loading="lazy">
    </ion-thumbnail>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">

  <!-- Matrix backend status -->
  <ion-card>
    <ion-card-header>
      <ion-card-title>Backend Status</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item lines="none">
        <ion-label>Matrix Backend</ion-label>
        <ion-badge [color]="isMatrixEnabled ? 'success' : 'medium'" slot="end">
          {{ isMatrixEnabled ? 'Enabled' : 'Disabled' }}
        </ion-badge>
      </ion-item>
      @if (!isMatrixEnabled) {
        <p class="hint-text">
          Enable the Matrix backend in the environment configuration to use migration features.
        </p>
      }
    </ion-card-content>
  </ion-card>

  <!-- Overall migration status -->
  @if (migrationStatus) {
    <ion-card>
      <ion-card-header>
        <ion-card-title>Migration Status</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item lines="none">
          <ion-label>Overall Status</ion-label>
          <ion-badge [class]="getStatusClass(migrationStatus.overallStatus)" slot="end">
            {{ getStatusLabel(migrationStatus.overallStatus) }}
          </ion-badge>
        </ion-item>
        <ion-item lines="none">
          <ion-label>Items Migrated</ion-label>
          <ion-note slot="end">{{ migrationStatus.totalItemsMigrated }}</ion-note>
        </ion-item>
        <ion-item lines="none">
          <ion-label>Items Failed</ion-label>
          <ion-note slot="end" [color]="migrationStatus.totalItemsFailed > 0 ? 'danger' : null">
            {{ migrationStatus.totalItemsFailed }}
          </ion-note>
        </ion-item>
        @if (migrationStatus.startedAt) {
          <ion-item lines="none">
            <ion-label>Started</ion-label>
            <ion-note slot="end">{{ formatTimestamp(migrationStatus.startedAt) }}</ion-note>
          </ion-item>
        }
        @if (migrationStatus.completedAt) {
          <ion-item lines="none">
            <ion-label>Completed</ion-label>
            <ion-note slot="end">{{ formatTimestamp(migrationStatus.completedAt) }}</ion-note>
          </ion-item>
        }
      </ion-card-content>
    </ion-card>
  }

  <!-- Migration steps -->
  @if (migrationStatus && migrationStatus.steps.length > 0) {
    <ion-card>
      <ion-card-header>
        <ion-card-title>Migration Steps</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        @for (step of migrationStatus.steps; track step) {
          <ion-item lines="full">
            <ion-label>
              <h3>{{ step.description }}</h3>
              <p>{{ step.itemsMigrated }} migrated, {{ step.itemsFailed }} failed</p>
              @if (step.errors.length > 0) {
                <p class="error-text">
                  {{ step.errors[0] }}
                  @if (step.errors.length > 1) {
                    <span> (+{{ step.errors.length - 1 }} more)</span>
                  }
                </p>
              }
            </ion-label>
            <ion-badge [class]="getStatusClass(step.status)" slot="end">
              {{ getStatusLabel(step.status) }}
            </ion-badge>
          </ion-item>
        }
      </ion-card-content>
    </ion-card>
  }

  <!-- Migration controls -->
  <ion-card>
    <ion-card-header>
      <ion-card-title>User Data Migration</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-button expand="block" color="primary"
        [disabled]="!migrationService || isRunning"
        (click)="migrateUserData()">
        <ion-icon name="person-outline" slot="start"></ion-icon>
        Migrate User Data
      </ion-button>

      <ion-button expand="block" color="secondary"
        [disabled]="!migrationService || isRunning"
        (click)="verifyUserData()">
        <ion-icon name="checkmark-circle-outline" slot="start"></ion-icon>
        Verify User Data
      </ion-button>

      <ion-button expand="block" color="warning"
        [disabled]="!migrationService || isRunning"
        (click)="rollbackUserData()">
        <ion-icon name="arrow-undo-outline" slot="start"></ion-icon>
        Rollback User Data
      </ion-button>
    </ion-card-content>
  </ion-card>

  <!-- Poll data migration controls -->
  <ion-card>
    <ion-card-header>
      <ion-card-title>Poll Data Migration</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-input label="Poll ID" labelPlacement="stacked"
          [(ngModel)]="pollIdInput"
          placeholder="Enter poll ID to migrate"
          [disabled]="!migrationService || isRunning">
        </ion-input>
      </ion-item>

      <ion-button expand="block" color="primary"
        [disabled]="!migrationService || isRunning || !pollIdInput"
        (click)="migratePollData(pollIdInput)">
        <ion-icon name="document-outline" slot="start"></ion-icon>
        Migrate Poll Data
      </ion-button>

      <ion-button expand="block" color="secondary"
        [disabled]="!migrationService || isRunning || !pollIdInput"
        (click)="verifyPollData(pollIdInput)">
        <ion-icon name="checkmark-circle-outline" slot="start"></ion-icon>
        Verify Poll Data
      </ion-button>

      <ion-button expand="block" color="warning"
        [disabled]="!migrationService || isRunning || !pollIdInput"
        (click)="rollbackPollData(pollIdInput)">
        <ion-icon name="arrow-undo-outline" slot="start"></ion-icon>
        Rollback Poll Data
      </ion-button>
    </ion-card-content>
  </ion-card>

  <!-- Overall migration controls -->
  <ion-card>
    <ion-card-header>
      <ion-card-title>Migration Controls</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-button expand="block" color="success"
        [disabled]="!migrationService || isRunning || migrationStatus?.overallStatus !== 'in_progress'"
        (click)="completeMigration()">
        <ion-icon name="flag-outline" slot="start"></ion-icon>
        Complete Migration
      </ion-button>

      <ion-button expand="block" color="medium"
        [disabled]="!migrationService || isRunning"
        (click)="resetMigration()">
        <ion-icon name="refresh-outline" slot="start"></ion-icon>
        Reset Migration
      </ion-button>
    </ion-card-content>
  </ion-card>

  <!-- Log output -->
  @if (logMessages.length > 0) {
    <ion-card>
      <ion-card-header>
        <ion-card-title>Migration Log</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <div class="log-container">
          @for (msg of logMessages; track msg) {
            <p class="log-entry">{{ msg }}</p>
          }
        </div>
      </ion-card-content>
    </ion-card>
  }

</ion-content>
`;
  }
});

// angular:jit:style:src/app/migration/migration.page.scss
var migration_page_default2;
var init_migration_page2 = __esm({
  "angular:jit:style:src/app/migration/migration.page.scss"() {
    migration_page_default2 = '@charset "UTF-8";\n\n/* src/app/migration/migration.page.scss */\n.status-completed {\n  --background: var(--ion-color-success);\n  color: white;\n}\n.status-verified {\n  --background: #28a745;\n  color: white;\n}\n.status-failed {\n  --background: var(--ion-color-danger);\n  color: white;\n}\n.status-in-progress {\n  --background: var(--ion-color-warning);\n  color: black;\n}\n.status-rolled-back {\n  --background: var(--ion-color-tertiary);\n  color: white;\n}\n.status-pending {\n  --background: var(--ion-color-medium);\n  color: white;\n}\n.hint-text {\n  color: var(--ion-color-medium);\n  font-style: italic;\n  margin-top: 8px;\n}\n.error-text {\n  color: var(--ion-color-danger) !important;\n  font-size: 0.85em;\n}\n.log-container {\n  max-height: 300px;\n  overflow-y: auto;\n  background: var(--ion-color-light);\n  border-radius: 8px;\n  padding: 8px;\n  font-family: monospace;\n  font-size: 0.85em;\n}\n.log-entry {\n  margin: 2px 0;\n  padding: 2px 4px;\n  word-break: break-all;\n}\nion-button {\n  margin-top: 8px;\n}\n/*# sourceMappingURL=migration.page.css.map */\n';
  }
});

// src/app/migration/migration.page.ts
var MigrationPage_1, MigrationPage;
var init_migration_page3 = __esm({
  "src/app/migration/migration.page.ts"() {
    init_tslib_es6();
    init_migration_page();
    init_migration_page2();
    init_core();
    init_environment();
    init_migration_service();
    init_data_adapter_service();
    init_couchdb_backend();
    init_matrix_backend();
    MigrationPage = class MigrationPage2 {
      static {
        MigrationPage_1 = this;
      }
      /** Whether the Matrix backend is enabled */
      get isMatrixEnabled() {
        return environment.useMatrixBackend;
      }
      static {
        this.STORAGE_KEY = "vodle_migration_state";
      }
      constructor(dataAdapter) {
        this.dataAdapter = dataAdapter;
        this.migrationService = null;
        this.migrationStatus = null;
        this.isRunning = false;
        this.logMessages = [];
        this.pollIdInput = "";
        this.userDataKeys = ["consent", "email", "language", "theme", "default_wap"];
        this.pollMetadataKeys = ["title", "desc", "url", "type", "language", "due", "due_type", "due_custom", "start_date"];
      }
      ngOnInit() {
        this.autoInitMigration();
        this.loadState();
        this.refreshStatus();
      }
      /**
       * Auto-initialize the migration service using the DataAdapter.
       * If both a CouchDB data service and a Matrix service are available
       * from the DataAdapter, they are used as source (CouchDB) and target
       * (Matrix) backends for the migration.
       */
      autoInitMigration() {
        const couchDB = this.dataAdapter.getDataServiceForMigration();
        const matrixService = this.dataAdapter.getMatrixServiceForMigration();
        if (couchDB && matrixService) {
          const source = new CouchDBBackend(couchDB);
          const target = new MatrixBackend(matrixService);
          this.initMigration(source, target);
          this.addLog("Migration auto-initialized via DataAdapter");
        } else {
          this.addLog("Migration auto-initialization skipped: required backends not available via DataAdapter");
        }
      }
      /**
       * Initialize the migration service with source and target backends.
       * In production, these would be CouchDBBackend and MatrixBackend.
       * The backends are injected externally via initMigration().
       */
      initMigration(source, target) {
        this.migrationService = new MigrationService(source, target);
        this.logMessages = [];
        this.refreshStatus();
        this.addLog("Migration service initialized");
      }
      /**
       * Start the user data migration.
       */
      migrateUserData() {
        return __async(this, null, function* () {
          if (!this.migrationService || this.isRunning)
            return;
          this.isRunning = true;
          this.addLog("Starting user data migration...");
          try {
            const step = yield this.migrationService.migrateUserData(this.userDataKeys);
            this.addLog(`User data migration ${step.status}: ${step.itemsMigrated} items migrated, ${step.itemsFailed} failed`);
            if (step.errors.length > 0) {
              for (const error of step.errors) {
                this.addLog(`  Error: ${error}`);
              }
            }
          } catch (error) {
            this.addLog(`User data migration error: ${error}`);
          } finally {
            this.isRunning = false;
            this.refreshStatus();
            this.saveState();
          }
        });
      }
      /**
       * Start the poll data migration for a given poll ID.
       */
      migratePollData(pollId) {
        return __async(this, null, function* () {
          if (!this.migrationService || this.isRunning)
            return;
          const trimmedPollId = pollId.trim();
          if (!trimmedPollId) {
            this.addLog("Cannot start poll data migration: poll ID is empty or whitespace-only");
            return;
          }
          this.isRunning = true;
          this.addLog(`Starting poll data migration for ${trimmedPollId}...`);
          try {
            const steps = [yield this.migrationService.migratePollData(trimmedPollId, this.pollMetadataKeys)];
            if (steps[0].status === "completed") {
              steps.push(yield this.migrationService.migratePollOptions(trimmedPollId));
              steps.push(yield this.migrationService.migrateRatings(trimmedPollId));
              steps.push(yield this.migrationService.migratePollState(trimmedPollId));
            }
            for (const step of steps) {
              this.addLog(`${step.description} ${step.status}: ${step.itemsMigrated} items migrated, ${step.itemsFailed} failed`);
              for (const error of step.errors) {
                this.addLog(`  Error: ${error}`);
              }
            }
          } catch (error) {
            this.addLog(`Poll data migration error: ${error}`);
          } finally {
            this.isRunning = false;
            this.refreshStatus();
            this.saveState();
          }
        });
      }
      /**
       * Verify user data migration.
       */
      verifyUserData() {
        return __async(this, null, function* () {
          if (!this.migrationService || this.isRunning)
            return;
          this.isRunning = true;
          this.addLog("Verifying user data migration...");
          try {
            const step = yield this.migrationService.verifyUserData(this.userDataKeys);
            this.addLog(`User data verification ${step.status}: ${step.itemsMigrated} verified, ${step.itemsFailed} mismatched`);
            if (step.errors.length > 0) {
              for (const error of step.errors) {
                this.addLog(`  Error: ${error}`);
              }
            }
          } catch (error) {
            this.addLog(`Verification error: ${error}`);
          } finally {
            this.isRunning = false;
            this.refreshStatus();
            this.saveState();
          }
        });
      }
      /**
       * Verify poll data migration.
       */
      verifyPollData(pollId) {
        return __async(this, null, function* () {
          if (!this.migrationService || this.isRunning)
            return;
          const trimmedPollId = pollId.trim();
          if (!trimmedPollId) {
            this.addLog("Cannot verify poll data: poll ID is empty or whitespace-only");
            return;
          }
          this.isRunning = true;
          this.addLog(`Verifying poll ${trimmedPollId} migration...`);
          try {
            const step = yield this.migrationService.verifyPollData(trimmedPollId, this.pollMetadataKeys);
            this.addLog(`Poll ${trimmedPollId} verification ${step.status}: ${step.itemsMigrated} verified, ${step.itemsFailed} mismatched`);
            if (step.errors.length > 0) {
              for (const error of step.errors) {
                this.addLog(`  Error: ${error}`);
              }
            }
          } catch (error) {
            this.addLog(`Verification error: ${error}`);
          } finally {
            this.isRunning = false;
            this.refreshStatus();
            this.saveState();
          }
        });
      }
      /**
       * Complete the migration (mark as done).
       */
      completeMigration() {
        if (!this.migrationService)
          return;
        this.migrationService.completeMigration();
        this.addLog("Migration marked as completed");
        this.refreshStatus();
        this.saveState();
      }
      /**
       * Rollback user data from target back to source.
       */
      rollbackUserData() {
        return __async(this, null, function* () {
          if (!this.migrationService || this.isRunning)
            return;
          this.isRunning = true;
          this.addLog("Rolling back user data...");
          try {
            const step = yield this.migrationService.rollbackUserData(this.userDataKeys);
            this.addLog(`User data rollback ${step.status}: ${step.itemsMigrated} items restored, ${step.itemsFailed} failed`);
            if (step.errors.length > 0) {
              for (const error of step.errors) {
                this.addLog(`  Error: ${error}`);
              }
            }
          } catch (error) {
            this.addLog(`Rollback error: ${error}`);
          } finally {
            this.isRunning = false;
            this.refreshStatus();
            this.saveState();
          }
        });
      }
      /**
       * Rollback poll data from target back to source.
       */
      rollbackPollData(pollId) {
        return __async(this, null, function* () {
          if (!this.migrationService || this.isRunning)
            return;
          const trimmedPollId = pollId.trim();
          if (!trimmedPollId) {
            this.addLog("Cannot rollback poll data: poll ID is empty or whitespace-only");
            return;
          }
          this.isRunning = true;
          this.addLog(`Rolling back poll ${trimmedPollId} data...`);
          try {
            const step = yield this.migrationService.rollbackPollData(trimmedPollId, this.pollMetadataKeys);
            this.addLog(`Poll ${trimmedPollId} rollback ${step.status}: ${step.itemsMigrated} items restored, ${step.itemsFailed} failed`);
            if (step.errors.length > 0) {
              for (const error of step.errors) {
                this.addLog(`  Error: ${error}`);
              }
            }
          } catch (error) {
            this.addLog(`Rollback error: ${error}`);
          } finally {
            this.isRunning = false;
            this.refreshStatus();
            this.saveState();
          }
        });
      }
      /**
       * Reset the migration state.
       */
      resetMigration() {
        if (!this.migrationService)
          return;
        this.migrationService.resetMigration();
        this.logMessages = [];
        this.addLog("Migration reset");
        this.refreshStatus();
        this.clearSavedState();
      }
      /**
       * Refresh the migration status display.
       */
      refreshStatus() {
        if (this.migrationService) {
          this.migrationStatus = this.migrationService.getMigrationStatus();
        } else {
          this.migrationStatus = null;
        }
      }
      /**
       * Get a CSS class for a step status badge.
       */
      getStatusClass(status) {
        switch (status) {
          case "completed":
            return "status-completed";
          case "verified":
            return "status-verified";
          case "failed":
            return "status-failed";
          case "in_progress":
            return "status-in-progress";
          case "rolled_back":
            return "status-rolled-back";
          default:
            return "status-pending";
        }
      }
      /**
       * Get a human-readable label for a status.
       */
      getStatusLabel(status) {
        switch (status) {
          case "not_started":
            return "Not Started";
          case "in_progress":
            return "In Progress";
          case "completed":
            return "Completed";
          case "verified":
            return "Verified";
          case "failed":
            return "Failed";
          case "rolled_back":
            return "Rolled Back";
          default:
            return status;
        }
      }
      /**
       * Format a timestamp for display.
       */
      formatTimestamp(ts) {
        if (!ts)
          return "\u2014";
        return new Date(ts).toLocaleString();
      }
      addLog(message) {
        const timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
        this.logMessages.push(`[${timestamp}] ${message}`);
      }
      /**
       * Save the current migration state to localStorage.
       * Called automatically after each migration operation.
       */
      saveState() {
        if (!this.migrationService)
          return;
        try {
          const state = this.migrationService.exportState();
          localStorage.setItem(MigrationPage_1.STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
          this.addLog(`Failed to save migration state: ${error}`);
        }
      }
      /**
       * Load previously saved migration state from localStorage.
       * Called during page initialization to restore progress after reload.
       */
      loadState() {
        if (!this.migrationService)
          return;
        try {
          const raw = localStorage.getItem(MigrationPage_1.STORAGE_KEY);
          if (raw) {
            const state = JSON.parse(raw);
            this.migrationService.importState(state);
            this.addLog("Restored migration state from previous session");
          }
        } catch (error) {
          this.addLog(`Failed to load migration state: ${error}`);
        }
      }
      /**
       * Clear saved migration state from localStorage.
       */
      clearSavedState() {
        localStorage.removeItem(MigrationPage_1.STORAGE_KEY);
        this.addLog("Cleared saved migration state");
      }
      static {
        this.ctorParameters = () => [
          { type: DataAdapter }
        ];
      }
    };
    MigrationPage = MigrationPage_1 = __decorate([
      Component({
        selector: "app-migration",
        template: migration_page_default,
        changeDetection: ChangeDetectionStrategy.Eager,
        standalone: false,
        styles: [migration_page_default2]
      })
    ], MigrationPage);
  }
});

// src/app/migration/migration.page.spec.ts
var require_migration_page_spec = __commonJS({
  "src/app/migration/migration.page.spec.ts"(exports) {
    init_testing();
    init_lazy();
    init_forms();
    init_migration_page3();
    init_in_memory_backend();
    init_data_adapter_service();
    var MockDataAdapter = class {
      getDataService() {
        return null;
      }
      getMatrixService() {
        return null;
      }
      getDataServiceForMigration() {
        return null;
      }
      getMatrixServiceForMigration() {
        return null;
      }
    };
    describe("MigrationPage", () => {
      let component;
      let fixture;
      beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [MigrationPage],
          imports: [IonicModule.forRoot(), FormsModule],
          providers: [
            { provide: DataAdapter, useClass: MockDataAdapter }
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(MigrationPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
      it("should start with null migration status", () => {
        expect(component.migrationStatus).toBeNull();
        expect(component.migrationService).toBeNull();
      });
      it("should not be running initially", () => {
        expect(component.isRunning).toBeFalse();
      });
      it("should have skip log message initially when backends not available", () => {
        expect(component.logMessages.length).toBe(1);
        expect(component.logMessages[0]).toContain("skipped");
      });
      describe("autoInitMigration", () => {
        it("should skip auto-init when DataAdapter returns null services", () => {
          expect(component.migrationService).toBeNull();
        });
        it("should log skip message when backends are not available", () => {
          component.logMessages = [];
          component.autoInitMigration();
          expect(component.logMessages.some((m) => m.includes("skipped"))).toBeTrue();
          expect(component.migrationService).toBeNull();
        });
        it("should auto-init when DataAdapter provides both services", () => {
          const mockDataService = {};
          const mockMatrixService = {};
          const mockAdapter = {
            getDataServiceForMigration: () => mockDataService,
            getMatrixServiceForMigration: () => mockMatrixService
          };
          component.dataAdapter = mockAdapter;
          component.logMessages = [];
          component.autoInitMigration();
          expect(component.migrationService).toBeTruthy();
          expect(component.logMessages.some((m) => m.includes("auto-initialized"))).toBeTrue();
        });
      });
      describe("initMigration", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
        }));
        it("should initialize the migration service", () => {
          component.initMigration(source, target);
          expect(component.migrationService).toBeTruthy();
          expect(component.migrationStatus).toBeTruthy();
          expect(component.migrationStatus.overallStatus).toBe("not_started");
        });
        it("should add a log message on init", () => {
          component.initMigration(source, target);
          expect(component.logMessages.length).toBe(1);
          expect(component.logMessages[0]).toContain("initialized");
        });
      });
      describe("migrateUserData", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
        }));
        it("should migrate user data and update status", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield source.setUserData("theme", "dark");
          yield component.migrateUserData();
          expect(component.migrationStatus.overallStatus).toBe("in_progress");
          expect(component.migrationStatus.totalItemsMigrated).toBeGreaterThan(0);
          expect(component.logMessages.length).toBeGreaterThan(1);
        }));
        it("should do nothing when no migration service is initialized", () => __async(null, null, function* () {
          component.migrationService = null;
          yield component.migrateUserData();
          expect(component.logMessages.length).toBe(1);
        }));
        it("should not run if already running", () => __async(null, null, function* () {
          component.isRunning = true;
          const initialLogLength = component.logMessages.length;
          yield component.migrateUserData();
          expect(component.logMessages.length).toBe(initialLogLength);
        }));
      });
      describe("verifyUserData", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
        }));
        it("should verify user data after migration", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          yield component.migrateUserData();
          component.migrationService.resetMigration();
          component.initMigration(source, target);
          yield source.setUserData("language", "en");
          yield component.migrateUserData();
          yield component.verifyUserData();
          const verifyStep = component.migrationStatus.steps.find((s) => s.id === "verify:user_data");
          expect(verifyStep).toBeTruthy();
        }));
      });
      describe("migratePollData", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
        }));
        it("should migrate poll data and update status", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Lunch venue");
          yield source.setPollData("poll1", "desc", "Where to eat?");
          yield component.migratePollData("poll1");
          expect(component.migrationStatus.overallStatus).toBe("in_progress");
          expect(component.migrationStatus.totalItemsMigrated).toBeGreaterThan(0);
          expect(component.logMessages.length).toBeGreaterThan(1);
        }));
        it("should do nothing when no migration service is initialized", () => __async(null, null, function* () {
          component.migrationService = null;
          yield component.migratePollData("poll1");
          expect(component.logMessages.length).toBe(1);
        }));
        it("should not run if already running", () => __async(null, null, function* () {
          component.isRunning = true;
          const initialLogLength = component.logMessages.length;
          yield component.migratePollData("poll1");
          expect(component.logMessages.length).toBe(initialLogLength);
        }));
        it("should log failure when source poll has no title", () => __async(null, null, function* () {
          yield component.migratePollData("nonexistent");
          expect(component.migrationStatus.totalItemsFailed).toBeGreaterThan(0);
          expect(component.logMessages.some((m) => m.includes("failed"))).toBeTrue();
        }));
        it("should reject whitespace-only poll ID", () => __async(null, null, function* () {
          yield component.migratePollData("   ");
          expect(component.logMessages.some((m) => m.includes("empty or whitespace-only"))).toBeTrue();
          expect(component.isRunning).toBeFalse();
        }));
      });
      describe("verifyPollData", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
        }));
        it("should verify poll data after migration", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Lunch");
          yield source.setPollData("poll1", "desc", "Where?");
          yield component.migratePollData("poll1");
          yield component.verifyPollData("poll1");
          const verifyStep = component.migrationStatus.steps.find((s) => s.id === "verify:poll:poll1");
          expect(verifyStep).toBeTruthy();
          expect(verifyStep.status).toBe("verified");
        }));
        it("should detect verification mismatches", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Lunch");
          yield component.migratePollData("poll1");
          yield target.setPollData("poll1", "title", "Different Title");
          yield component.verifyPollData("poll1");
          const verifyStep = component.migrationStatus.steps.find((s) => s.id === "verify:poll:poll1");
          expect(verifyStep).toBeTruthy();
          expect(verifyStep.status).toBe("failed");
        }));
        it("should do nothing when no migration service is initialized", () => __async(null, null, function* () {
          component.migrationService = null;
          yield component.verifyPollData("poll1");
          expect(component.logMessages.length).toBe(1);
        }));
        it("should reject whitespace-only poll ID", () => __async(null, null, function* () {
          yield component.verifyPollData("   ");
          expect(component.logMessages.some((m) => m.includes("empty or whitespace-only"))).toBeTrue();
          expect(component.isRunning).toBeFalse();
        }));
      });
      describe("completeMigration", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
        }));
        it("should mark migration as completed", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          yield component.migrateUserData();
          component.completeMigration();
          expect(component.migrationStatus.overallStatus).toBe("completed");
        }));
      });
      describe("rollbackUserData", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
        }));
        it("should rollback user data", () => __async(null, null, function* () {
          yield target.setUserData("language", "fr");
          yield component.rollbackUserData();
          expect(component.migrationStatus.overallStatus).toBe("rolled_back");
          expect(yield source.getUserData("language")).toBe("fr");
        }));
      });
      describe("resetMigration", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
        }));
        it("should reset migration state", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          yield component.migrateUserData();
          component.resetMigration();
          expect(component.migrationStatus.overallStatus).toBe("not_started");
          expect(component.migrationStatus.steps.length).toBe(0);
        }));
        it("should clear log messages on reset", () => {
          component.resetMigration();
          expect(component.logMessages.length).toBe(2);
          expect(component.logMessages[0]).toContain("reset");
          expect(component.logMessages[1]).toContain("Cleared saved");
        });
      });
      describe("utility methods", () => {
        it("should return correct status classes", () => {
          expect(component.getStatusClass("completed")).toBe("status-completed");
          expect(component.getStatusClass("verified")).toBe("status-verified");
          expect(component.getStatusClass("failed")).toBe("status-failed");
          expect(component.getStatusClass("in_progress")).toBe("status-in-progress");
          expect(component.getStatusClass("rolled_back")).toBe("status-rolled-back");
          expect(component.getStatusClass("pending")).toBe("status-pending");
          expect(component.getStatusClass("unknown")).toBe("status-pending");
        });
        it("should return correct status labels", () => {
          expect(component.getStatusLabel("not_started")).toBe("Not Started");
          expect(component.getStatusLabel("in_progress")).toBe("In Progress");
          expect(component.getStatusLabel("completed")).toBe("Completed");
          expect(component.getStatusLabel("verified")).toBe("Verified");
          expect(component.getStatusLabel("failed")).toBe("Failed");
          expect(component.getStatusLabel("rolled_back")).toBe("Rolled Back");
          expect(component.getStatusLabel("other")).toBe("other");
        });
        it("should format timestamps", () => {
          expect(component.formatTimestamp(void 0)).toBe("\u2014");
          const formatted = component.formatTimestamp(17e11);
          expect(formatted).toBeTruthy();
          expect(formatted).not.toBe("\u2014");
          expect(formatted).toMatch(/\d/);
        });
      });
      describe("rollbackPollData", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
        }));
        it("should rollback poll data", () => __async(null, null, function* () {
          yield target.createPoll("poll1", "Target Title");
          yield target.setPollData("poll1", "desc", "Target Desc");
          yield component.rollbackPollData("poll1");
          expect(yield source.getPollData("poll1", "title")).toBe("Target Title");
          expect(yield source.getPollData("poll1", "desc")).toBe("Target Desc");
          expect(component.migrationStatus.overallStatus).toBe("rolled_back");
        }));
        it("should reject whitespace-only poll ID", () => __async(null, null, function* () {
          yield component.rollbackPollData("   ");
          expect(component.logMessages.some((m) => m.includes("empty or whitespace-only"))).toBeTrue();
          expect(component.isRunning).toBeFalse();
        }));
        it("should do nothing when no migration service is initialized", () => __async(null, null, function* () {
          component.migrationService = null;
          const initialLogLength = component.logMessages.length;
          yield component.rollbackPollData("poll1");
          expect(component.logMessages.length).toBe(initialLogLength);
        }));
      });
      describe("state persistence", () => {
        let source;
        let target;
        beforeEach(() => __async(null, null, function* () {
          source = new InMemoryBackend();
          target = new InMemoryBackend();
          yield source.login("test@example.com", "password");
          yield target.login("test@example.com", "password");
          component.initMigration(source, target);
          localStorage.removeItem("vodle_migration_state");
        }));
        afterEach(() => {
          localStorage.removeItem("vodle_migration_state");
        });
        it("should save state to localStorage after migrateUserData", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield component.migrateUserData();
          const saved = localStorage.getItem("vodle_migration_state");
          expect(saved).toBeTruthy();
          const parsed = JSON.parse(saved);
          expect(parsed.overallStatus).toBe("in_progress");
          expect(parsed.steps.length).toBeGreaterThan(0);
        }));
        it("should save state to localStorage after migratePollData", () => __async(null, null, function* () {
          yield source.createPoll("poll1", "Test");
          yield component.migratePollData("poll1");
          const saved = localStorage.getItem("vodle_migration_state");
          expect(saved).toBeTruthy();
        }));
        it("should save state after completeMigration", () => __async(null, null, function* () {
          yield source.setUserData("language", "en");
          yield component.migrateUserData();
          component.completeMigration();
          const saved = localStorage.getItem("vodle_migration_state");
          expect(saved).toBeTruthy();
          const parsed = JSON.parse(saved);
          expect(parsed.overallStatus).toBe("completed");
        }));
        it("should restore state from localStorage on loadState", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield component.migrateUserData();
          component.initMigration(source, target);
          component.loadState();
          component.refreshStatus();
          expect(component.migrationStatus.overallStatus).toBe("in_progress");
          expect(component.migrationStatus.steps.length).toBe(1);
          expect(component.logMessages.some((m) => m.includes("Restored migration state"))).toBeTrue();
        }));
        it("should clear saved state on resetMigration", () => __async(null, null, function* () {
          yield source.setUserData("language", "de");
          yield component.migrateUserData();
          expect(localStorage.getItem("vodle_migration_state")).toBeTruthy();
          component.resetMigration();
          expect(localStorage.getItem("vodle_migration_state")).toBeNull();
        }));
        it("should not fail when localStorage has invalid JSON", () => {
          localStorage.setItem("vodle_migration_state", "not-valid-json");
          component.loadState();
          expect(component.logMessages.some((m) => m.includes("Failed to load"))).toBeTrue();
        });
        it("should not save when no migration service", () => {
          component.migrationService = null;
          component.saveState();
          expect(localStorage.getItem("vodle_migration_state")).toBeNull();
        });
        it("should not load when no migration service", () => {
          localStorage.setItem("vodle_migration_state", '{"overallStatus":"completed"}');
          component.migrationService = null;
          const initialLogLength = component.logMessages.length;
          component.loadState();
          expect(component.logMessages.length).toBe(initialLogLength);
        });
        it("should clear saved state via clearSavedState", () => {
          localStorage.setItem("vodle_migration_state", '{"overallStatus":"completed"}');
          component.clearSavedState();
          expect(localStorage.getItem("vodle_migration_state")).toBeNull();
          expect(component.logMessages.some((m) => m.includes("Cleared saved"))).toBeTrue();
        });
      });
    });
  }
});
export default require_migration_page_spec();
//# debugId=ee6ea8a0-9fa7-528a-884e-6ce49d148090
//# sourceMappingURL=spec-app-migration-migration.page.spec.js.map
