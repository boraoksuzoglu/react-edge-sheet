/// <reference types="@testing-library/jest-dom" />
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);
afterEach(cleanup);
