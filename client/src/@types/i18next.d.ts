import 'i18next';

import { defaultNS, resources } from '../settings/i18n.setting';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['pt'];
  }
}
