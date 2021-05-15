import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Present = list({
  access: {
    create: isSignedIn,
    read: rules.canReadPresents,
    update: rules.canManagePresents,
    delete: rules.canManagePresents,
  },
  ui: {
    listView: {
      initialColumns: ['name', 'body', 'price', 'status'],
    },
  },
  fields: {
    name: text({ isRequired: false }),
    body: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    comment: relationship({ ref: 'Present.comments' }),
    comments: relationship({ ref: 'Present.comment', many: true }),
    loves: relationship({ ref: 'Love.present', many: true }),
    image: text({ isRequired: false }),
    creationTime: text({ isRequired: true }),
    status: select({
      options: [
        {
          label: 'Draft',
          value: 'DRAFT',
        },
        {
          label: 'Available',
          value: 'AVAILABLE',
        },
        {
          label: 'Unavailable',
          value: 'UNAVAILABLE',
        },
      ],
      defaultValue: 'DRAFT',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    type: select({
      options: [
        {
          label: 'Offer',
          value: 'OFFER',
        },
        {
          label: 'Post',
          value: 'POST',
        },
        {
          label: 'Comment',
          value: 'COMMENT',
        },
      ],
      defaultValue: 'POST',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer(),
    lifeseed: relationship({
      ref: 'Lifeseed.presents',
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
});
