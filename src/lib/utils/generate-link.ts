import { z } from 'zod';

const FormNames = {
	channelName: 'channel',
	replier: 'replier'
} as const;

const generateLinkSchema = z.object({
	[FormNames.channelName]: z.string(),
	[FormNames.replier]: z.string().optional()
});

export { FormNames, generateLinkSchema };
