import { TestBed } from '@angular/core/testing';
import { LogService } from './log.service';
describe('LogService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(LogService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=log.service.spec.js.map