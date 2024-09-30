import {user} from '../../src/projects/junior/interface';
import { describe, it, expect } from 'vitest';

describe('User object', () => {

    it('should have the correct name', () => {
      expect(user.name).toBe("John");
    });
  

    it('should have the correct age', () => {
      expect(user.age).toBe(30);
    });
  

    it('should not have isAdmin field by default', () => {
      expect(user.isAdmin).toBeUndefined();
    });
  });