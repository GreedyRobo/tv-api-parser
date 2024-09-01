import { z } from "zod";

export const payloadValidator = z.object({
  totalCount: z.number(),
  data: z.array(
    z.object({
      s: z.string(),
      d: z.tuple([
        z.string(),
        z.string(),
        z.string(),
        z.string(),
        z.string(),
        z.tuple([z.string()]),
        z.number(),
        z.number(),
        z.number(),
        z.string(),
        z.number(),
        z.string(),
        z.number(),
        z.number(),
        z.number().nullable(),
        z.number(),
        z.string(),
        z.number(),
        z.number(),
        z.number().nullable(),
        z.number(),
        z.string(),
        z.string(),
        z.string(),
        z.number().nullable(),
        z.number(),
        z.number(),
        z.string(),
      ]),
    }),
  ),
});

export type Payload = z.infer<typeof payloadValidator>;

export const queryValidator = z
  .object({
    date: z.string().date().optional(),
  })
  .transform(({ date, ...rest }) => ({
    ...rest,
    date: date ? new Date(date) : undefined,
  }));

export type Query = z.infer<typeof queryValidator>;
