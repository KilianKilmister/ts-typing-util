export declare type ElementType<T> = T extends readonly (infer U)[] ? U : never;
