import {
  integer,
  relationship,
  select,
  text,
  virtual,
} from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';
import formatPrice from '../lib/formatter';

export const Package = list({
  access: {
    create: isSignedIn,
    read: rules.canPackage,
    update: () => false,
    delete: () => false,
  },
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item) {
        return `${formatPrice(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: 'PackageItem.package', many: true }),
    lifeseed: relationship({ ref: 'Lifeseed.packages' }),
    charge: text(),
  },
});
