
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ApiToken
 * 
 */
export type ApiToken = $Result.DefaultSelection<Prisma.$ApiTokenPayload>
/**
 * Model WebhookEndpoint
 * 
 */
export type WebhookEndpoint = $Result.DefaultSelection<Prisma.$WebhookEndpointPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model EventDelivery
 * 
 */
export type EventDelivery = $Result.DefaultSelection<Prisma.$EventDeliveryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AllowedCurrency: {
  USDC: 'USDC',
  USDT: 'USDT'
};

export type AllowedCurrency = (typeof AllowedCurrency)[keyof typeof AllowedCurrency]


export const EventType: {
  PAYMENT_COMPLETED: 'PAYMENT_COMPLETED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PAYMENT_PENDING: 'PAYMENT_PENDING'
};

export type EventType = (typeof EventType)[keyof typeof EventType]


export const TokenEnvironment: {
  TEST: 'TEST',
  LIVE: 'LIVE'
};

export type TokenEnvironment = (typeof TokenEnvironment)[keyof typeof TokenEnvironment]


export const TokenStatus: {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED'
};

export type TokenStatus = (typeof TokenStatus)[keyof typeof TokenStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const DeliveryStatus: {
  PENDING: 'PENDING',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
  RETRYING: 'RETRYING'
};

export type DeliveryStatus = (typeof DeliveryStatus)[keyof typeof DeliveryStatus]


export const WebhookEndpointStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  REVOKED: 'REVOKED'
};

export type WebhookEndpointStatus = (typeof WebhookEndpointStatus)[keyof typeof WebhookEndpointStatus]

}

export type AllowedCurrency = $Enums.AllowedCurrency

export const AllowedCurrency: typeof $Enums.AllowedCurrency

export type EventType = $Enums.EventType

export const EventType: typeof $Enums.EventType

export type TokenEnvironment = $Enums.TokenEnvironment

export const TokenEnvironment: typeof $Enums.TokenEnvironment

export type TokenStatus = $Enums.TokenStatus

export const TokenStatus: typeof $Enums.TokenStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type DeliveryStatus = $Enums.DeliveryStatus

export const DeliveryStatus: typeof $Enums.DeliveryStatus

export type WebhookEndpointStatus = $Enums.WebhookEndpointStatus

export const WebhookEndpointStatus: typeof $Enums.WebhookEndpointStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiToken`: Exposes CRUD operations for the **ApiToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiTokens
    * const apiTokens = await prisma.apiToken.findMany()
    * ```
    */
  get apiToken(): Prisma.ApiTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEndpoint`: Exposes CRUD operations for the **WebhookEndpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEndpoints
    * const webhookEndpoints = await prisma.webhookEndpoint.findMany()
    * ```
    */
  get webhookEndpoint(): Prisma.WebhookEndpointDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventDelivery`: Exposes CRUD operations for the **EventDelivery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventDeliveries
    * const eventDeliveries = await prisma.eventDelivery.findMany()
    * ```
    */
  get eventDelivery(): Prisma.EventDeliveryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    Project: 'Project',
    ApiToken: 'ApiToken',
    WebhookEndpoint: 'WebhookEndpoint',
    Payment: 'Payment',
    Event: 'Event',
    Product: 'Product',
    EventDelivery: 'EventDelivery'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "account" | "verification" | "project" | "apiToken" | "webhookEndpoint" | "payment" | "event" | "product" | "eventDelivery"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ApiToken: {
        payload: Prisma.$ApiTokenPayload<ExtArgs>
        fields: Prisma.ApiTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          findFirst: {
            args: Prisma.ApiTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          findMany: {
            args: Prisma.ApiTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          create: {
            args: Prisma.ApiTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          createMany: {
            args: Prisma.ApiTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          delete: {
            args: Prisma.ApiTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          update: {
            args: Prisma.ApiTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          deleteMany: {
            args: Prisma.ApiTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>[]
          }
          upsert: {
            args: Prisma.ApiTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiTokenPayload>
          }
          aggregate: {
            args: Prisma.ApiTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiToken>
          }
          groupBy: {
            args: Prisma.ApiTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiTokenCountArgs<ExtArgs>
            result: $Utils.Optional<ApiTokenCountAggregateOutputType> | number
          }
        }
      }
      WebhookEndpoint: {
        payload: Prisma.$WebhookEndpointPayload<ExtArgs>
        fields: Prisma.WebhookEndpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEndpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEndpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          findFirst: {
            args: Prisma.WebhookEndpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEndpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          findMany: {
            args: Prisma.WebhookEndpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>[]
          }
          create: {
            args: Prisma.WebhookEndpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          createMany: {
            args: Prisma.WebhookEndpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEndpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>[]
          }
          delete: {
            args: Prisma.WebhookEndpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          update: {
            args: Prisma.WebhookEndpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEndpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEndpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookEndpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>[]
          }
          upsert: {
            args: Prisma.WebhookEndpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          aggregate: {
            args: Prisma.WebhookEndpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEndpoint>
          }
          groupBy: {
            args: Prisma.WebhookEndpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEndpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEndpointCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEndpointCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      EventDelivery: {
        payload: Prisma.$EventDeliveryPayload<ExtArgs>
        fields: Prisma.EventDeliveryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventDeliveryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventDeliveryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>
          }
          findFirst: {
            args: Prisma.EventDeliveryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventDeliveryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>
          }
          findMany: {
            args: Prisma.EventDeliveryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>[]
          }
          create: {
            args: Prisma.EventDeliveryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>
          }
          createMany: {
            args: Prisma.EventDeliveryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventDeliveryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>[]
          }
          delete: {
            args: Prisma.EventDeliveryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>
          }
          update: {
            args: Prisma.EventDeliveryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>
          }
          deleteMany: {
            args: Prisma.EventDeliveryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventDeliveryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventDeliveryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>[]
          }
          upsert: {
            args: Prisma.EventDeliveryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventDeliveryPayload>
          }
          aggregate: {
            args: Prisma.EventDeliveryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventDelivery>
          }
          groupBy: {
            args: Prisma.EventDeliveryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventDeliveryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventDeliveryCountArgs<ExtArgs>
            result: $Utils.Optional<EventDeliveryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    project?: ProjectOmit
    apiToken?: ApiTokenOmit
    webhookEndpoint?: WebhookEndpointOmit
    payment?: PaymentOmit
    event?: EventOmit
    product?: ProductOmit
    eventDelivery?: EventDeliveryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
    projects: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    apiTokens: number
    payments: number
    events: number
    webhookEndpoints: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    apiTokens?: boolean | ProjectCountOutputTypeCountApiTokensArgs
    payments?: boolean | ProjectCountOutputTypeCountPaymentsArgs
    events?: boolean | ProjectCountOutputTypeCountEventsArgs
    webhookEndpoints?: boolean | ProjectCountOutputTypeCountWebhookEndpointsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountApiTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiTokenWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountWebhookEndpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEndpointWhereInput
  }


  /**
   * Count Type ApiTokenCountOutputType
   */

  export type ApiTokenCountOutputType = {
    payments: number
    events: number
  }

  export type ApiTokenCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | ApiTokenCountOutputTypeCountPaymentsArgs
    events?: boolean | ApiTokenCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * ApiTokenCountOutputType without action
   */
  export type ApiTokenCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiTokenCountOutputType
     */
    select?: ApiTokenCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ApiTokenCountOutputType without action
   */
  export type ApiTokenCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * ApiTokenCountOutputType without action
   */
  export type ApiTokenCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type WebhookEndpointCountOutputType
   */

  export type WebhookEndpointCountOutputType = {
    deliveries: number
  }

  export type WebhookEndpointCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | WebhookEndpointCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * WebhookEndpointCountOutputType without action
   */
  export type WebhookEndpointCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpointCountOutputType
     */
    select?: WebhookEndpointCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WebhookEndpointCountOutputType without action
   */
  export type WebhookEndpointCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDeliveryWhereInput
  }


  /**
   * Count Type PaymentCountOutputType
   */

  export type PaymentCountOutputType = {
    products: number
    events: number
  }

  export type PaymentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | PaymentCountOutputTypeCountProductsArgs
    events?: boolean | PaymentCountOutputTypeCountEventsArgs
  }

  // Custom InputTypes
  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentCountOutputType
     */
    select?: PaymentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    deliveries: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    deliveries?: boolean | EventCountOutputTypeCountDeliveriesArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountDeliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDeliveryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    walletAddress: string | null
    verifiedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    walletAddress: string | null
    verifiedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    walletAddress: number
    verifiedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    walletAddress?: true
    verifiedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    walletAddress?: true
    verifiedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    walletAddress?: true
    verifiedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    walletAddress: string | null
    verifiedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    walletAddress?: boolean
    verifiedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    walletAddress?: boolean
    verifiedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    walletAddress?: boolean
    verifiedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    walletAddress?: boolean
    verifiedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "walletAddress" | "verifiedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
      walletAddress: string | null
      verifiedAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly walletAddress: FieldRef<"User", 'String'>
    readonly verifiedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    apiTokens?: boolean | Project$apiTokensArgs<ExtArgs>
    payments?: boolean | Project$paymentsArgs<ExtArgs>
    events?: boolean | Project$eventsArgs<ExtArgs>
    webhookEndpoints?: boolean | Project$webhookEndpointsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    apiTokens?: boolean | Project$apiTokensArgs<ExtArgs>
    payments?: boolean | Project$paymentsArgs<ExtArgs>
    events?: boolean | Project$eventsArgs<ExtArgs>
    webhookEndpoints?: boolean | Project$webhookEndpointsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      apiTokens: Prisma.$ApiTokenPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
      webhookEndpoints: Prisma.$WebhookEndpointPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    apiTokens<T extends Project$apiTokensArgs<ExtArgs> = {}>(args?: Subset<T, Project$apiTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Project$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Project$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Project$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Project$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    webhookEndpoints<T extends Project$webhookEndpointsArgs<ExtArgs> = {}>(args?: Subset<T, Project$webhookEndpointsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly userId: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.apiTokens
   */
  export type Project$apiTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    where?: ApiTokenWhereInput
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    cursor?: ApiTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * Project.payments
   */
  export type Project$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Project.events
   */
  export type Project$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Project.webhookEndpoints
   */
  export type Project$webhookEndpointsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    where?: WebhookEndpointWhereInput
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    cursor?: WebhookEndpointWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ApiToken
   */

  export type AggregateApiToken = {
    _count: ApiTokenCountAggregateOutputType | null
    _avg: ApiTokenAvgAggregateOutputType | null
    _sum: ApiTokenSumAggregateOutputType | null
    _min: ApiTokenMinAggregateOutputType | null
    _max: ApiTokenMaxAggregateOutputType | null
  }

  export type ApiTokenAvgAggregateOutputType = {
    requestCount: number | null
  }

  export type ApiTokenSumAggregateOutputType = {
    requestCount: number | null
  }

  export type ApiTokenMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    tokenHash: string | null
    environment: $Enums.TokenEnvironment | null
    lastUsedAt: Date | null
    requestCount: number | null
    createdAt: Date | null
    revokedAt: Date | null
    status: $Enums.TokenStatus | null
  }

  export type ApiTokenMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    tokenHash: string | null
    environment: $Enums.TokenEnvironment | null
    lastUsedAt: Date | null
    requestCount: number | null
    createdAt: Date | null
    revokedAt: Date | null
    status: $Enums.TokenStatus | null
  }

  export type ApiTokenCountAggregateOutputType = {
    id: number
    projectId: number
    tokenHash: number
    environment: number
    allowedDomains: number
    lastUsedAt: number
    requestCount: number
    createdAt: number
    revokedAt: number
    status: number
    _all: number
  }


  export type ApiTokenAvgAggregateInputType = {
    requestCount?: true
  }

  export type ApiTokenSumAggregateInputType = {
    requestCount?: true
  }

  export type ApiTokenMinAggregateInputType = {
    id?: true
    projectId?: true
    tokenHash?: true
    environment?: true
    lastUsedAt?: true
    requestCount?: true
    createdAt?: true
    revokedAt?: true
    status?: true
  }

  export type ApiTokenMaxAggregateInputType = {
    id?: true
    projectId?: true
    tokenHash?: true
    environment?: true
    lastUsedAt?: true
    requestCount?: true
    createdAt?: true
    revokedAt?: true
    status?: true
  }

  export type ApiTokenCountAggregateInputType = {
    id?: true
    projectId?: true
    tokenHash?: true
    environment?: true
    allowedDomains?: true
    lastUsedAt?: true
    requestCount?: true
    createdAt?: true
    revokedAt?: true
    status?: true
    _all?: true
  }

  export type ApiTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiToken to aggregate.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiTokens
    **/
    _count?: true | ApiTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApiTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApiTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiTokenMaxAggregateInputType
  }

  export type GetApiTokenAggregateType<T extends ApiTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateApiToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiToken[P]>
      : GetScalarType<T[P], AggregateApiToken[P]>
  }




  export type ApiTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiTokenWhereInput
    orderBy?: ApiTokenOrderByWithAggregationInput | ApiTokenOrderByWithAggregationInput[]
    by: ApiTokenScalarFieldEnum[] | ApiTokenScalarFieldEnum
    having?: ApiTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiTokenCountAggregateInputType | true
    _avg?: ApiTokenAvgAggregateInputType
    _sum?: ApiTokenSumAggregateInputType
    _min?: ApiTokenMinAggregateInputType
    _max?: ApiTokenMaxAggregateInputType
  }

  export type ApiTokenGroupByOutputType = {
    id: string
    projectId: string
    tokenHash: string
    environment: $Enums.TokenEnvironment
    allowedDomains: string[]
    lastUsedAt: Date | null
    requestCount: number
    createdAt: Date
    revokedAt: Date | null
    status: $Enums.TokenStatus
    _count: ApiTokenCountAggregateOutputType | null
    _avg: ApiTokenAvgAggregateOutputType | null
    _sum: ApiTokenSumAggregateOutputType | null
    _min: ApiTokenMinAggregateOutputType | null
    _max: ApiTokenMaxAggregateOutputType | null
  }

  type GetApiTokenGroupByPayload<T extends ApiTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiTokenGroupByOutputType[P]>
            : GetScalarType<T[P], ApiTokenGroupByOutputType[P]>
        }
      >
    >


  export type ApiTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tokenHash?: boolean
    environment?: boolean
    allowedDomains?: boolean
    lastUsedAt?: boolean
    requestCount?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    status?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    payments?: boolean | ApiToken$paymentsArgs<ExtArgs>
    events?: boolean | ApiToken$eventsArgs<ExtArgs>
    _count?: boolean | ApiTokenCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tokenHash?: boolean
    environment?: boolean
    allowedDomains?: boolean
    lastUsedAt?: boolean
    requestCount?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    status?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tokenHash?: boolean
    environment?: boolean
    allowedDomains?: boolean
    lastUsedAt?: boolean
    requestCount?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    status?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiToken"]>

  export type ApiTokenSelectScalar = {
    id?: boolean
    projectId?: boolean
    tokenHash?: boolean
    environment?: boolean
    allowedDomains?: boolean
    lastUsedAt?: boolean
    requestCount?: boolean
    createdAt?: boolean
    revokedAt?: boolean
    status?: boolean
  }

  export type ApiTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "tokenHash" | "environment" | "allowedDomains" | "lastUsedAt" | "requestCount" | "createdAt" | "revokedAt" | "status", ExtArgs["result"]["apiToken"]>
  export type ApiTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    payments?: boolean | ApiToken$paymentsArgs<ExtArgs>
    events?: boolean | ApiToken$eventsArgs<ExtArgs>
    _count?: boolean | ApiTokenCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ApiTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ApiTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ApiTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiToken"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      tokenHash: string
      environment: $Enums.TokenEnvironment
      allowedDomains: string[]
      lastUsedAt: Date | null
      requestCount: number
      createdAt: Date
      revokedAt: Date | null
      status: $Enums.TokenStatus
    }, ExtArgs["result"]["apiToken"]>
    composites: {}
  }

  type ApiTokenGetPayload<S extends boolean | null | undefined | ApiTokenDefaultArgs> = $Result.GetResult<Prisma.$ApiTokenPayload, S>

  type ApiTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiTokenCountAggregateInputType | true
    }

  export interface ApiTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiToken'], meta: { name: 'ApiToken' } }
    /**
     * Find zero or one ApiToken that matches the filter.
     * @param {ApiTokenFindUniqueArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiTokenFindUniqueArgs>(args: SelectSubset<T, ApiTokenFindUniqueArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiTokenFindUniqueOrThrowArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindFirstArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiTokenFindFirstArgs>(args?: SelectSubset<T, ApiTokenFindFirstArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindFirstOrThrowArgs} args - Arguments to find a ApiToken
     * @example
     * // Get one ApiToken
     * const apiToken = await prisma.apiToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiTokens
     * const apiTokens = await prisma.apiToken.findMany()
     * 
     * // Get first 10 ApiTokens
     * const apiTokens = await prisma.apiToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiTokenFindManyArgs>(args?: SelectSubset<T, ApiTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiToken.
     * @param {ApiTokenCreateArgs} args - Arguments to create a ApiToken.
     * @example
     * // Create one ApiToken
     * const ApiToken = await prisma.apiToken.create({
     *   data: {
     *     // ... data to create a ApiToken
     *   }
     * })
     * 
     */
    create<T extends ApiTokenCreateArgs>(args: SelectSubset<T, ApiTokenCreateArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiTokens.
     * @param {ApiTokenCreateManyArgs} args - Arguments to create many ApiTokens.
     * @example
     * // Create many ApiTokens
     * const apiToken = await prisma.apiToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiTokenCreateManyArgs>(args?: SelectSubset<T, ApiTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiTokens and returns the data saved in the database.
     * @param {ApiTokenCreateManyAndReturnArgs} args - Arguments to create many ApiTokens.
     * @example
     * // Create many ApiTokens
     * const apiToken = await prisma.apiToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiTokens and only return the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiToken.
     * @param {ApiTokenDeleteArgs} args - Arguments to delete one ApiToken.
     * @example
     * // Delete one ApiToken
     * const ApiToken = await prisma.apiToken.delete({
     *   where: {
     *     // ... filter to delete one ApiToken
     *   }
     * })
     * 
     */
    delete<T extends ApiTokenDeleteArgs>(args: SelectSubset<T, ApiTokenDeleteArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiToken.
     * @param {ApiTokenUpdateArgs} args - Arguments to update one ApiToken.
     * @example
     * // Update one ApiToken
     * const apiToken = await prisma.apiToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiTokenUpdateArgs>(args: SelectSubset<T, ApiTokenUpdateArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiTokens.
     * @param {ApiTokenDeleteManyArgs} args - Arguments to filter ApiTokens to delete.
     * @example
     * // Delete a few ApiTokens
     * const { count } = await prisma.apiToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiTokenDeleteManyArgs>(args?: SelectSubset<T, ApiTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiTokens
     * const apiToken = await prisma.apiToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiTokenUpdateManyArgs>(args: SelectSubset<T, ApiTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiTokens and returns the data updated in the database.
     * @param {ApiTokenUpdateManyAndReturnArgs} args - Arguments to update many ApiTokens.
     * @example
     * // Update many ApiTokens
     * const apiToken = await prisma.apiToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiTokens and only return the `id`
     * const apiTokenWithIdOnly = await prisma.apiToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApiTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiToken.
     * @param {ApiTokenUpsertArgs} args - Arguments to update or create a ApiToken.
     * @example
     * // Update or create a ApiToken
     * const apiToken = await prisma.apiToken.upsert({
     *   create: {
     *     // ... data to create a ApiToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiToken we want to update
     *   }
     * })
     */
    upsert<T extends ApiTokenUpsertArgs>(args: SelectSubset<T, ApiTokenUpsertArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenCountArgs} args - Arguments to filter ApiTokens to count.
     * @example
     * // Count the number of ApiTokens
     * const count = await prisma.apiToken.count({
     *   where: {
     *     // ... the filter for the ApiTokens we want to count
     *   }
     * })
    **/
    count<T extends ApiTokenCountArgs>(
      args?: Subset<T, ApiTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiTokenAggregateArgs>(args: Subset<T, ApiTokenAggregateArgs>): Prisma.PrismaPromise<GetApiTokenAggregateType<T>>

    /**
     * Group by ApiToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiTokenGroupByArgs['orderBy'] }
        : { orderBy?: ApiTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiToken model
   */
  readonly fields: ApiTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payments<T extends ApiToken$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, ApiToken$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends ApiToken$eventsArgs<ExtArgs> = {}>(args?: Subset<T, ApiToken$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiToken model
   */
  interface ApiTokenFieldRefs {
    readonly id: FieldRef<"ApiToken", 'String'>
    readonly projectId: FieldRef<"ApiToken", 'String'>
    readonly tokenHash: FieldRef<"ApiToken", 'String'>
    readonly environment: FieldRef<"ApiToken", 'TokenEnvironment'>
    readonly allowedDomains: FieldRef<"ApiToken", 'String[]'>
    readonly lastUsedAt: FieldRef<"ApiToken", 'DateTime'>
    readonly requestCount: FieldRef<"ApiToken", 'Int'>
    readonly createdAt: FieldRef<"ApiToken", 'DateTime'>
    readonly revokedAt: FieldRef<"ApiToken", 'DateTime'>
    readonly status: FieldRef<"ApiToken", 'TokenStatus'>
  }
    

  // Custom InputTypes
  /**
   * ApiToken findUnique
   */
  export type ApiTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken findUniqueOrThrow
   */
  export type ApiTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken findFirst
   */
  export type ApiTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiTokens.
     */
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken findFirstOrThrow
   */
  export type ApiTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiToken to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiTokens.
     */
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken findMany
   */
  export type ApiTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter, which ApiTokens to fetch.
     */
    where?: ApiTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiTokens to fetch.
     */
    orderBy?: ApiTokenOrderByWithRelationInput | ApiTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiTokens.
     */
    cursor?: ApiTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiTokens.
     */
    skip?: number
    distinct?: ApiTokenScalarFieldEnum | ApiTokenScalarFieldEnum[]
  }

  /**
   * ApiToken create
   */
  export type ApiTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiToken.
     */
    data: XOR<ApiTokenCreateInput, ApiTokenUncheckedCreateInput>
  }

  /**
   * ApiToken createMany
   */
  export type ApiTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiTokens.
     */
    data: ApiTokenCreateManyInput | ApiTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiToken createManyAndReturn
   */
  export type ApiTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * The data used to create many ApiTokens.
     */
    data: ApiTokenCreateManyInput | ApiTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiToken update
   */
  export type ApiTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiToken.
     */
    data: XOR<ApiTokenUpdateInput, ApiTokenUncheckedUpdateInput>
    /**
     * Choose, which ApiToken to update.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken updateMany
   */
  export type ApiTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiTokens.
     */
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyInput>
    /**
     * Filter which ApiTokens to update
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to update.
     */
    limit?: number
  }

  /**
   * ApiToken updateManyAndReturn
   */
  export type ApiTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * The data used to update ApiTokens.
     */
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyInput>
    /**
     * Filter which ApiTokens to update
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiToken upsert
   */
  export type ApiTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiToken to update in case it exists.
     */
    where: ApiTokenWhereUniqueInput
    /**
     * In case the ApiToken found by the `where` argument doesn't exist, create a new ApiToken with this data.
     */
    create: XOR<ApiTokenCreateInput, ApiTokenUncheckedCreateInput>
    /**
     * In case the ApiToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiTokenUpdateInput, ApiTokenUncheckedUpdateInput>
  }

  /**
   * ApiToken delete
   */
  export type ApiTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    /**
     * Filter which ApiToken to delete.
     */
    where: ApiTokenWhereUniqueInput
  }

  /**
   * ApiToken deleteMany
   */
  export type ApiTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiTokens to delete
     */
    where?: ApiTokenWhereInput
    /**
     * Limit how many ApiTokens to delete.
     */
    limit?: number
  }

  /**
   * ApiToken.payments
   */
  export type ApiToken$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * ApiToken.events
   */
  export type ApiToken$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * ApiToken without action
   */
  export type ApiTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
  }


  /**
   * Model WebhookEndpoint
   */

  export type AggregateWebhookEndpoint = {
    _count: WebhookEndpointCountAggregateOutputType | null
    _min: WebhookEndpointMinAggregateOutputType | null
    _max: WebhookEndpointMaxAggregateOutputType | null
  }

  export type WebhookEndpointMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    url: string | null
    description: string | null
    secret: string | null
    status: $Enums.WebhookEndpointStatus | null
    lastTimeHit: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookEndpointMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    url: string | null
    description: string | null
    secret: string | null
    status: $Enums.WebhookEndpointStatus | null
    lastTimeHit: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookEndpointCountAggregateOutputType = {
    id: number
    projectId: number
    url: number
    description: number
    secret: number
    status: number
    eventTypes: number
    lastTimeHit: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WebhookEndpointMinAggregateInputType = {
    id?: true
    projectId?: true
    url?: true
    description?: true
    secret?: true
    status?: true
    lastTimeHit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookEndpointMaxAggregateInputType = {
    id?: true
    projectId?: true
    url?: true
    description?: true
    secret?: true
    status?: true
    lastTimeHit?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookEndpointCountAggregateInputType = {
    id?: true
    projectId?: true
    url?: true
    description?: true
    secret?: true
    status?: true
    eventTypes?: true
    lastTimeHit?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WebhookEndpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEndpoint to aggregate.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEndpoints
    **/
    _count?: true | WebhookEndpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEndpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEndpointMaxAggregateInputType
  }

  export type GetWebhookEndpointAggregateType<T extends WebhookEndpointAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEndpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEndpoint[P]>
      : GetScalarType<T[P], AggregateWebhookEndpoint[P]>
  }




  export type WebhookEndpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEndpointWhereInput
    orderBy?: WebhookEndpointOrderByWithAggregationInput | WebhookEndpointOrderByWithAggregationInput[]
    by: WebhookEndpointScalarFieldEnum[] | WebhookEndpointScalarFieldEnum
    having?: WebhookEndpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEndpointCountAggregateInputType | true
    _min?: WebhookEndpointMinAggregateInputType
    _max?: WebhookEndpointMaxAggregateInputType
  }

  export type WebhookEndpointGroupByOutputType = {
    id: string
    projectId: string
    url: string
    description: string | null
    secret: string
    status: $Enums.WebhookEndpointStatus
    eventTypes: $Enums.EventType[]
    lastTimeHit: Date | null
    createdAt: Date
    updatedAt: Date
    _count: WebhookEndpointCountAggregateOutputType | null
    _min: WebhookEndpointMinAggregateOutputType | null
    _max: WebhookEndpointMaxAggregateOutputType | null
  }

  type GetWebhookEndpointGroupByPayload<T extends WebhookEndpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEndpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEndpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEndpointGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEndpointGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEndpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    url?: boolean
    description?: boolean
    secret?: boolean
    status?: boolean
    eventTypes?: boolean
    lastTimeHit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    deliveries?: boolean | WebhookEndpoint$deliveriesArgs<ExtArgs>
    _count?: boolean | WebhookEndpointCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookEndpoint"]>

  export type WebhookEndpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    url?: boolean
    description?: boolean
    secret?: boolean
    status?: boolean
    eventTypes?: boolean
    lastTimeHit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookEndpoint"]>

  export type WebhookEndpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    url?: boolean
    description?: boolean
    secret?: boolean
    status?: boolean
    eventTypes?: boolean
    lastTimeHit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookEndpoint"]>

  export type WebhookEndpointSelectScalar = {
    id?: boolean
    projectId?: boolean
    url?: boolean
    description?: boolean
    secret?: boolean
    status?: boolean
    eventTypes?: boolean
    lastTimeHit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WebhookEndpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "url" | "description" | "secret" | "status" | "eventTypes" | "lastTimeHit" | "createdAt" | "updatedAt", ExtArgs["result"]["webhookEndpoint"]>
  export type WebhookEndpointInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    deliveries?: boolean | WebhookEndpoint$deliveriesArgs<ExtArgs>
    _count?: boolean | WebhookEndpointCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WebhookEndpointIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type WebhookEndpointIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $WebhookEndpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEndpoint"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      deliveries: Prisma.$EventDeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      url: string
      description: string | null
      secret: string
      status: $Enums.WebhookEndpointStatus
      eventTypes: $Enums.EventType[]
      lastTimeHit: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["webhookEndpoint"]>
    composites: {}
  }

  type WebhookEndpointGetPayload<S extends boolean | null | undefined | WebhookEndpointDefaultArgs> = $Result.GetResult<Prisma.$WebhookEndpointPayload, S>

  type WebhookEndpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookEndpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookEndpointCountAggregateInputType | true
    }

  export interface WebhookEndpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEndpoint'], meta: { name: 'WebhookEndpoint' } }
    /**
     * Find zero or one WebhookEndpoint that matches the filter.
     * @param {WebhookEndpointFindUniqueArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEndpointFindUniqueArgs>(args: SelectSubset<T, WebhookEndpointFindUniqueArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookEndpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEndpointFindUniqueOrThrowArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEndpointFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEndpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEndpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindFirstArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEndpointFindFirstArgs>(args?: SelectSubset<T, WebhookEndpointFindFirstArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEndpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindFirstOrThrowArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEndpointFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEndpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookEndpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEndpoints
     * const webhookEndpoints = await prisma.webhookEndpoint.findMany()
     * 
     * // Get first 10 WebhookEndpoints
     * const webhookEndpoints = await prisma.webhookEndpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEndpointWithIdOnly = await prisma.webhookEndpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEndpointFindManyArgs>(args?: SelectSubset<T, WebhookEndpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookEndpoint.
     * @param {WebhookEndpointCreateArgs} args - Arguments to create a WebhookEndpoint.
     * @example
     * // Create one WebhookEndpoint
     * const WebhookEndpoint = await prisma.webhookEndpoint.create({
     *   data: {
     *     // ... data to create a WebhookEndpoint
     *   }
     * })
     * 
     */
    create<T extends WebhookEndpointCreateArgs>(args: SelectSubset<T, WebhookEndpointCreateArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookEndpoints.
     * @param {WebhookEndpointCreateManyArgs} args - Arguments to create many WebhookEndpoints.
     * @example
     * // Create many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEndpointCreateManyArgs>(args?: SelectSubset<T, WebhookEndpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEndpoints and returns the data saved in the database.
     * @param {WebhookEndpointCreateManyAndReturnArgs} args - Arguments to create many WebhookEndpoints.
     * @example
     * // Create many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEndpoints and only return the `id`
     * const webhookEndpointWithIdOnly = await prisma.webhookEndpoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEndpointCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEndpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookEndpoint.
     * @param {WebhookEndpointDeleteArgs} args - Arguments to delete one WebhookEndpoint.
     * @example
     * // Delete one WebhookEndpoint
     * const WebhookEndpoint = await prisma.webhookEndpoint.delete({
     *   where: {
     *     // ... filter to delete one WebhookEndpoint
     *   }
     * })
     * 
     */
    delete<T extends WebhookEndpointDeleteArgs>(args: SelectSubset<T, WebhookEndpointDeleteArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookEndpoint.
     * @param {WebhookEndpointUpdateArgs} args - Arguments to update one WebhookEndpoint.
     * @example
     * // Update one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEndpointUpdateArgs>(args: SelectSubset<T, WebhookEndpointUpdateArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookEndpoints.
     * @param {WebhookEndpointDeleteManyArgs} args - Arguments to filter WebhookEndpoints to delete.
     * @example
     * // Delete a few WebhookEndpoints
     * const { count } = await prisma.webhookEndpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEndpointDeleteManyArgs>(args?: SelectSubset<T, WebhookEndpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEndpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEndpointUpdateManyArgs>(args: SelectSubset<T, WebhookEndpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEndpoints and returns the data updated in the database.
     * @param {WebhookEndpointUpdateManyAndReturnArgs} args - Arguments to update many WebhookEndpoints.
     * @example
     * // Update many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookEndpoints and only return the `id`
     * const webhookEndpointWithIdOnly = await prisma.webhookEndpoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookEndpointUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookEndpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookEndpoint.
     * @param {WebhookEndpointUpsertArgs} args - Arguments to update or create a WebhookEndpoint.
     * @example
     * // Update or create a WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.upsert({
     *   create: {
     *     // ... data to create a WebhookEndpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEndpoint we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEndpointUpsertArgs>(args: SelectSubset<T, WebhookEndpointUpsertArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookEndpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointCountArgs} args - Arguments to filter WebhookEndpoints to count.
     * @example
     * // Count the number of WebhookEndpoints
     * const count = await prisma.webhookEndpoint.count({
     *   where: {
     *     // ... the filter for the WebhookEndpoints we want to count
     *   }
     * })
    **/
    count<T extends WebhookEndpointCountArgs>(
      args?: Subset<T, WebhookEndpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEndpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEndpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookEndpointAggregateArgs>(args: Subset<T, WebhookEndpointAggregateArgs>): Prisma.PrismaPromise<GetWebhookEndpointAggregateType<T>>

    /**
     * Group by WebhookEndpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookEndpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEndpointGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEndpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookEndpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEndpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEndpoint model
   */
  readonly fields: WebhookEndpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEndpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEndpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    deliveries<T extends WebhookEndpoint$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, WebhookEndpoint$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEndpoint model
   */
  interface WebhookEndpointFieldRefs {
    readonly id: FieldRef<"WebhookEndpoint", 'String'>
    readonly projectId: FieldRef<"WebhookEndpoint", 'String'>
    readonly url: FieldRef<"WebhookEndpoint", 'String'>
    readonly description: FieldRef<"WebhookEndpoint", 'String'>
    readonly secret: FieldRef<"WebhookEndpoint", 'String'>
    readonly status: FieldRef<"WebhookEndpoint", 'WebhookEndpointStatus'>
    readonly eventTypes: FieldRef<"WebhookEndpoint", 'EventType[]'>
    readonly lastTimeHit: FieldRef<"WebhookEndpoint", 'DateTime'>
    readonly createdAt: FieldRef<"WebhookEndpoint", 'DateTime'>
    readonly updatedAt: FieldRef<"WebhookEndpoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEndpoint findUnique
   */
  export type WebhookEndpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint findUniqueOrThrow
   */
  export type WebhookEndpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint findFirst
   */
  export type WebhookEndpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEndpoints.
     */
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint findFirstOrThrow
   */
  export type WebhookEndpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEndpoints.
     */
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint findMany
   */
  export type WebhookEndpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoints to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint create
   */
  export type WebhookEndpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookEndpoint.
     */
    data: XOR<WebhookEndpointCreateInput, WebhookEndpointUncheckedCreateInput>
  }

  /**
   * WebhookEndpoint createMany
   */
  export type WebhookEndpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEndpoints.
     */
    data: WebhookEndpointCreateManyInput | WebhookEndpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEndpoint createManyAndReturn
   */
  export type WebhookEndpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookEndpoints.
     */
    data: WebhookEndpointCreateManyInput | WebhookEndpointCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookEndpoint update
   */
  export type WebhookEndpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookEndpoint.
     */
    data: XOR<WebhookEndpointUpdateInput, WebhookEndpointUncheckedUpdateInput>
    /**
     * Choose, which WebhookEndpoint to update.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint updateMany
   */
  export type WebhookEndpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEndpoints.
     */
    data: XOR<WebhookEndpointUpdateManyMutationInput, WebhookEndpointUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEndpoints to update
     */
    where?: WebhookEndpointWhereInput
    /**
     * Limit how many WebhookEndpoints to update.
     */
    limit?: number
  }

  /**
   * WebhookEndpoint updateManyAndReturn
   */
  export type WebhookEndpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * The data used to update WebhookEndpoints.
     */
    data: XOR<WebhookEndpointUpdateManyMutationInput, WebhookEndpointUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEndpoints to update
     */
    where?: WebhookEndpointWhereInput
    /**
     * Limit how many WebhookEndpoints to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookEndpoint upsert
   */
  export type WebhookEndpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookEndpoint to update in case it exists.
     */
    where: WebhookEndpointWhereUniqueInput
    /**
     * In case the WebhookEndpoint found by the `where` argument doesn't exist, create a new WebhookEndpoint with this data.
     */
    create: XOR<WebhookEndpointCreateInput, WebhookEndpointUncheckedCreateInput>
    /**
     * In case the WebhookEndpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEndpointUpdateInput, WebhookEndpointUncheckedUpdateInput>
  }

  /**
   * WebhookEndpoint delete
   */
  export type WebhookEndpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
    /**
     * Filter which WebhookEndpoint to delete.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint deleteMany
   */
  export type WebhookEndpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEndpoints to delete
     */
    where?: WebhookEndpointWhereInput
    /**
     * Limit how many WebhookEndpoints to delete.
     */
    limit?: number
  }

  /**
   * WebhookEndpoint.deliveries
   */
  export type WebhookEndpoint$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    where?: EventDeliveryWhereInput
    orderBy?: EventDeliveryOrderByWithRelationInput | EventDeliveryOrderByWithRelationInput[]
    cursor?: EventDeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDeliveryScalarFieldEnum | EventDeliveryScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint without action
   */
  export type WebhookEndpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookEndpointInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
    blockNumber: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: bigint | null
    blockNumber: bigint | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    tokenId: string | null
    amount: bigint | null
    currency: $Enums.AllowedCurrency | null
    recipientAddress: string | null
    txHash: string | null
    blockNumber: bigint | null
    status: $Enums.PaymentStatus | null
    failureReason: string | null
    monitoringStartedAt: Date | null
    confirmedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    idempotencyKey: string | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    tokenId: string | null
    amount: bigint | null
    currency: $Enums.AllowedCurrency | null
    recipientAddress: string | null
    txHash: string | null
    blockNumber: bigint | null
    status: $Enums.PaymentStatus | null
    failureReason: string | null
    monitoringStartedAt: Date | null
    confirmedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    idempotencyKey: string | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    projectId: number
    tokenId: number
    amount: number
    currency: number
    recipientAddress: number
    txHash: number
    blockNumber: number
    status: number
    failureReason: number
    monitoringStartedAt: number
    confirmedAt: number
    createdAt: number
    updatedAt: number
    idempotencyKey: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
    blockNumber?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
    blockNumber?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    projectId?: true
    tokenId?: true
    amount?: true
    currency?: true
    recipientAddress?: true
    txHash?: true
    blockNumber?: true
    status?: true
    failureReason?: true
    monitoringStartedAt?: true
    confirmedAt?: true
    createdAt?: true
    updatedAt?: true
    idempotencyKey?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    projectId?: true
    tokenId?: true
    amount?: true
    currency?: true
    recipientAddress?: true
    txHash?: true
    blockNumber?: true
    status?: true
    failureReason?: true
    monitoringStartedAt?: true
    confirmedAt?: true
    createdAt?: true
    updatedAt?: true
    idempotencyKey?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    projectId?: true
    tokenId?: true
    amount?: true
    currency?: true
    recipientAddress?: true
    txHash?: true
    blockNumber?: true
    status?: true
    failureReason?: true
    monitoringStartedAt?: true
    confirmedAt?: true
    createdAt?: true
    updatedAt?: true
    idempotencyKey?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    projectId: string
    tokenId: string | null
    amount: bigint
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash: string | null
    blockNumber: bigint | null
    status: $Enums.PaymentStatus
    failureReason: string | null
    monitoringStartedAt: Date
    confirmedAt: Date | null
    createdAt: Date
    updatedAt: Date
    idempotencyKey: string | null
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tokenId?: boolean
    amount?: boolean
    currency?: boolean
    recipientAddress?: boolean
    txHash?: boolean
    blockNumber?: boolean
    status?: boolean
    failureReason?: boolean
    monitoringStartedAt?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    idempotencyKey?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    token?: boolean | Payment$tokenArgs<ExtArgs>
    products?: boolean | Payment$productsArgs<ExtArgs>
    events?: boolean | Payment$eventsArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tokenId?: boolean
    amount?: boolean
    currency?: boolean
    recipientAddress?: boolean
    txHash?: boolean
    blockNumber?: boolean
    status?: boolean
    failureReason?: boolean
    monitoringStartedAt?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    idempotencyKey?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    token?: boolean | Payment$tokenArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    tokenId?: boolean
    amount?: boolean
    currency?: boolean
    recipientAddress?: boolean
    txHash?: boolean
    blockNumber?: boolean
    status?: boolean
    failureReason?: boolean
    monitoringStartedAt?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    idempotencyKey?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    token?: boolean | Payment$tokenArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    projectId?: boolean
    tokenId?: boolean
    amount?: boolean
    currency?: boolean
    recipientAddress?: boolean
    txHash?: boolean
    blockNumber?: boolean
    status?: boolean
    failureReason?: boolean
    monitoringStartedAt?: boolean
    confirmedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    idempotencyKey?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "tokenId" | "amount" | "currency" | "recipientAddress" | "txHash" | "blockNumber" | "status" | "failureReason" | "monitoringStartedAt" | "confirmedAt" | "createdAt" | "updatedAt" | "idempotencyKey", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    token?: boolean | Payment$tokenArgs<ExtArgs>
    products?: boolean | Payment$productsArgs<ExtArgs>
    events?: boolean | Payment$eventsArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    token?: boolean | Payment$tokenArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    token?: boolean | Payment$tokenArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      token: Prisma.$ApiTokenPayload<ExtArgs> | null
      products: Prisma.$ProductPayload<ExtArgs>[]
      events: Prisma.$EventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      tokenId: string | null
      amount: bigint
      currency: $Enums.AllowedCurrency
      recipientAddress: string
      txHash: string | null
      blockNumber: bigint | null
      status: $Enums.PaymentStatus
      failureReason: string | null
      monitoringStartedAt: Date
      confirmedAt: Date | null
      createdAt: Date
      updatedAt: Date
      idempotencyKey: string | null
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    token<T extends Payment$tokenArgs<ExtArgs> = {}>(args?: Subset<T, Payment$tokenArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    products<T extends Payment$productsArgs<ExtArgs> = {}>(args?: Subset<T, Payment$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    events<T extends Payment$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Payment$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly projectId: FieldRef<"Payment", 'String'>
    readonly tokenId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'BigInt'>
    readonly currency: FieldRef<"Payment", 'AllowedCurrency'>
    readonly recipientAddress: FieldRef<"Payment", 'String'>
    readonly txHash: FieldRef<"Payment", 'String'>
    readonly blockNumber: FieldRef<"Payment", 'BigInt'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly failureReason: FieldRef<"Payment", 'String'>
    readonly monitoringStartedAt: FieldRef<"Payment", 'DateTime'>
    readonly confirmedAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
    readonly idempotencyKey: FieldRef<"Payment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.token
   */
  export type Payment$tokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    where?: ApiTokenWhereInput
  }

  /**
   * Payment.products
   */
  export type Payment$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Payment.events
   */
  export type Payment$eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    type: $Enums.EventType | null
    sessionId: string | null
    paymentId: string | null
    tokenId: string | null
    occurredAt: Date | null
    createdAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    type: $Enums.EventType | null
    sessionId: string | null
    paymentId: string | null
    tokenId: string | null
    occurredAt: Date | null
    createdAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    projectId: number
    type: number
    sessionId: number
    paymentId: number
    tokenId: number
    metadata: number
    occurredAt: number
    createdAt: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    sessionId?: true
    paymentId?: true
    tokenId?: true
    occurredAt?: true
    createdAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    sessionId?: true
    paymentId?: true
    tokenId?: true
    occurredAt?: true
    createdAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    projectId?: true
    type?: true
    sessionId?: true
    paymentId?: true
    tokenId?: true
    metadata?: true
    occurredAt?: true
    createdAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    projectId: string
    type: $Enums.EventType
    sessionId: string
    paymentId: string | null
    tokenId: string | null
    metadata: JsonValue | null
    occurredAt: Date
    createdAt: Date
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    sessionId?: boolean
    paymentId?: boolean
    tokenId?: boolean
    metadata?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    payment?: boolean | Event$paymentArgs<ExtArgs>
    token?: boolean | Event$tokenArgs<ExtArgs>
    deliveries?: boolean | Event$deliveriesArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    sessionId?: boolean
    paymentId?: boolean
    tokenId?: boolean
    metadata?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    payment?: boolean | Event$paymentArgs<ExtArgs>
    token?: boolean | Event$tokenArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    type?: boolean
    sessionId?: boolean
    paymentId?: boolean
    tokenId?: boolean
    metadata?: boolean
    occurredAt?: boolean
    createdAt?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    payment?: boolean | Event$paymentArgs<ExtArgs>
    token?: boolean | Event$tokenArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    projectId?: boolean
    type?: boolean
    sessionId?: boolean
    paymentId?: boolean
    tokenId?: boolean
    metadata?: boolean
    occurredAt?: boolean
    createdAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "type" | "sessionId" | "paymentId" | "tokenId" | "metadata" | "occurredAt" | "createdAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    payment?: boolean | Event$paymentArgs<ExtArgs>
    token?: boolean | Event$tokenArgs<ExtArgs>
    deliveries?: boolean | Event$deliveriesArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    payment?: boolean | Event$paymentArgs<ExtArgs>
    token?: boolean | Event$tokenArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    payment?: boolean | Event$paymentArgs<ExtArgs>
    token?: boolean | Event$tokenArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      payment: Prisma.$PaymentPayload<ExtArgs> | null
      token: Prisma.$ApiTokenPayload<ExtArgs> | null
      deliveries: Prisma.$EventDeliveryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      type: $Enums.EventType
      sessionId: string
      paymentId: string | null
      tokenId: string | null
      metadata: Prisma.JsonValue | null
      occurredAt: Date
      createdAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payment<T extends Event$paymentArgs<ExtArgs> = {}>(args?: Subset<T, Event$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    token<T extends Event$tokenArgs<ExtArgs> = {}>(args?: Subset<T, Event$tokenArgs<ExtArgs>>): Prisma__ApiTokenClient<$Result.GetResult<Prisma.$ApiTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    deliveries<T extends Event$deliveriesArgs<ExtArgs> = {}>(args?: Subset<T, Event$deliveriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly projectId: FieldRef<"Event", 'String'>
    readonly type: FieldRef<"Event", 'EventType'>
    readonly sessionId: FieldRef<"Event", 'String'>
    readonly paymentId: FieldRef<"Event", 'String'>
    readonly tokenId: FieldRef<"Event", 'String'>
    readonly metadata: FieldRef<"Event", 'Json'>
    readonly occurredAt: FieldRef<"Event", 'DateTime'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.payment
   */
  export type Event$paymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }

  /**
   * Event.token
   */
  export type Event$tokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiToken
     */
    select?: ApiTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiToken
     */
    omit?: ApiTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiTokenInclude<ExtArgs> | null
    where?: ApiTokenWhereInput
  }

  /**
   * Event.deliveries
   */
  export type Event$deliveriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    where?: EventDeliveryWhereInput
    orderBy?: EventDeliveryOrderByWithRelationInput | EventDeliveryOrderByWithRelationInput[]
    cursor?: EventDeliveryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventDeliveryScalarFieldEnum | EventDeliveryScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: bigint | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    price: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
    paymentId: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    price: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
    paymentId: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    price: number
    createdAt: number
    updatedAt: number
    paymentId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    paymentId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    paymentId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    paymentId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    price: bigint
    createdAt: Date
    updatedAt: Date
    paymentId: string
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentId?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentId?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentId?: boolean
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    paymentId?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "createdAt" | "updatedAt" | "paymentId", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      payment: Prisma.$PaymentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      price: bigint
      createdAt: Date
      updatedAt: Date
      paymentId: string
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payment<T extends PaymentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentDefaultArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'BigInt'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly paymentId: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model EventDelivery
   */

  export type AggregateEventDelivery = {
    _count: EventDeliveryCountAggregateOutputType | null
    _avg: EventDeliveryAvgAggregateOutputType | null
    _sum: EventDeliverySumAggregateOutputType | null
    _min: EventDeliveryMinAggregateOutputType | null
    _max: EventDeliveryMaxAggregateOutputType | null
  }

  export type EventDeliveryAvgAggregateOutputType = {
    attemptNumber: number | null
    httpStatusCode: number | null
  }

  export type EventDeliverySumAggregateOutputType = {
    attemptNumber: number | null
    httpStatusCode: number | null
  }

  export type EventDeliveryMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    endpointId: string | null
    attemptNumber: number | null
    deliveryStatus: $Enums.DeliveryStatus | null
    httpStatusCode: number | null
    errorMessage: string | null
    responseBody: string | null
    createdAt: Date | null
    deliveredAt: Date | null
  }

  export type EventDeliveryMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    endpointId: string | null
    attemptNumber: number | null
    deliveryStatus: $Enums.DeliveryStatus | null
    httpStatusCode: number | null
    errorMessage: string | null
    responseBody: string | null
    createdAt: Date | null
    deliveredAt: Date | null
  }

  export type EventDeliveryCountAggregateOutputType = {
    id: number
    eventId: number
    endpointId: number
    attemptNumber: number
    deliveryStatus: number
    httpStatusCode: number
    errorMessage: number
    responseBody: number
    createdAt: number
    deliveredAt: number
    _all: number
  }


  export type EventDeliveryAvgAggregateInputType = {
    attemptNumber?: true
    httpStatusCode?: true
  }

  export type EventDeliverySumAggregateInputType = {
    attemptNumber?: true
    httpStatusCode?: true
  }

  export type EventDeliveryMinAggregateInputType = {
    id?: true
    eventId?: true
    endpointId?: true
    attemptNumber?: true
    deliveryStatus?: true
    httpStatusCode?: true
    errorMessage?: true
    responseBody?: true
    createdAt?: true
    deliveredAt?: true
  }

  export type EventDeliveryMaxAggregateInputType = {
    id?: true
    eventId?: true
    endpointId?: true
    attemptNumber?: true
    deliveryStatus?: true
    httpStatusCode?: true
    errorMessage?: true
    responseBody?: true
    createdAt?: true
    deliveredAt?: true
  }

  export type EventDeliveryCountAggregateInputType = {
    id?: true
    eventId?: true
    endpointId?: true
    attemptNumber?: true
    deliveryStatus?: true
    httpStatusCode?: true
    errorMessage?: true
    responseBody?: true
    createdAt?: true
    deliveredAt?: true
    _all?: true
  }

  export type EventDeliveryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDelivery to aggregate.
     */
    where?: EventDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDeliveries to fetch.
     */
    orderBy?: EventDeliveryOrderByWithRelationInput | EventDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EventDeliveries
    **/
    _count?: true | EventDeliveryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventDeliveryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventDeliverySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventDeliveryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventDeliveryMaxAggregateInputType
  }

  export type GetEventDeliveryAggregateType<T extends EventDeliveryAggregateArgs> = {
        [P in keyof T & keyof AggregateEventDelivery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventDelivery[P]>
      : GetScalarType<T[P], AggregateEventDelivery[P]>
  }




  export type EventDeliveryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventDeliveryWhereInput
    orderBy?: EventDeliveryOrderByWithAggregationInput | EventDeliveryOrderByWithAggregationInput[]
    by: EventDeliveryScalarFieldEnum[] | EventDeliveryScalarFieldEnum
    having?: EventDeliveryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventDeliveryCountAggregateInputType | true
    _avg?: EventDeliveryAvgAggregateInputType
    _sum?: EventDeliverySumAggregateInputType
    _min?: EventDeliveryMinAggregateInputType
    _max?: EventDeliveryMaxAggregateInputType
  }

  export type EventDeliveryGroupByOutputType = {
    id: string
    eventId: string
    endpointId: string
    attemptNumber: number
    deliveryStatus: $Enums.DeliveryStatus
    httpStatusCode: number | null
    errorMessage: string | null
    responseBody: string | null
    createdAt: Date
    deliveredAt: Date | null
    _count: EventDeliveryCountAggregateOutputType | null
    _avg: EventDeliveryAvgAggregateOutputType | null
    _sum: EventDeliverySumAggregateOutputType | null
    _min: EventDeliveryMinAggregateOutputType | null
    _max: EventDeliveryMaxAggregateOutputType | null
  }

  type GetEventDeliveryGroupByPayload<T extends EventDeliveryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventDeliveryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventDeliveryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventDeliveryGroupByOutputType[P]>
            : GetScalarType<T[P], EventDeliveryGroupByOutputType[P]>
        }
      >
    >


  export type EventDeliverySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    endpointId?: boolean
    attemptNumber?: boolean
    deliveryStatus?: boolean
    httpStatusCode?: boolean
    errorMessage?: boolean
    responseBody?: boolean
    createdAt?: boolean
    deliveredAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    endpoint?: boolean | WebhookEndpointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDelivery"]>

  export type EventDeliverySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    endpointId?: boolean
    attemptNumber?: boolean
    deliveryStatus?: boolean
    httpStatusCode?: boolean
    errorMessage?: boolean
    responseBody?: boolean
    createdAt?: boolean
    deliveredAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    endpoint?: boolean | WebhookEndpointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDelivery"]>

  export type EventDeliverySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    endpointId?: boolean
    attemptNumber?: boolean
    deliveryStatus?: boolean
    httpStatusCode?: boolean
    errorMessage?: boolean
    responseBody?: boolean
    createdAt?: boolean
    deliveredAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    endpoint?: boolean | WebhookEndpointDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eventDelivery"]>

  export type EventDeliverySelectScalar = {
    id?: boolean
    eventId?: boolean
    endpointId?: boolean
    attemptNumber?: boolean
    deliveryStatus?: boolean
    httpStatusCode?: boolean
    errorMessage?: boolean
    responseBody?: boolean
    createdAt?: boolean
    deliveredAt?: boolean
  }

  export type EventDeliveryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "endpointId" | "attemptNumber" | "deliveryStatus" | "httpStatusCode" | "errorMessage" | "responseBody" | "createdAt" | "deliveredAt", ExtArgs["result"]["eventDelivery"]>
  export type EventDeliveryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    endpoint?: boolean | WebhookEndpointDefaultArgs<ExtArgs>
  }
  export type EventDeliveryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    endpoint?: boolean | WebhookEndpointDefaultArgs<ExtArgs>
  }
  export type EventDeliveryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    endpoint?: boolean | WebhookEndpointDefaultArgs<ExtArgs>
  }

  export type $EventDeliveryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EventDelivery"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      endpoint: Prisma.$WebhookEndpointPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      endpointId: string
      attemptNumber: number
      deliveryStatus: $Enums.DeliveryStatus
      httpStatusCode: number | null
      errorMessage: string | null
      responseBody: string | null
      createdAt: Date
      deliveredAt: Date | null
    }, ExtArgs["result"]["eventDelivery"]>
    composites: {}
  }

  type EventDeliveryGetPayload<S extends boolean | null | undefined | EventDeliveryDefaultArgs> = $Result.GetResult<Prisma.$EventDeliveryPayload, S>

  type EventDeliveryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventDeliveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventDeliveryCountAggregateInputType | true
    }

  export interface EventDeliveryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EventDelivery'], meta: { name: 'EventDelivery' } }
    /**
     * Find zero or one EventDelivery that matches the filter.
     * @param {EventDeliveryFindUniqueArgs} args - Arguments to find a EventDelivery
     * @example
     * // Get one EventDelivery
     * const eventDelivery = await prisma.eventDelivery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventDeliveryFindUniqueArgs>(args: SelectSubset<T, EventDeliveryFindUniqueArgs<ExtArgs>>): Prisma__EventDeliveryClient<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventDelivery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventDeliveryFindUniqueOrThrowArgs} args - Arguments to find a EventDelivery
     * @example
     * // Get one EventDelivery
     * const eventDelivery = await prisma.eventDelivery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventDeliveryFindUniqueOrThrowArgs>(args: SelectSubset<T, EventDeliveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventDeliveryClient<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDelivery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDeliveryFindFirstArgs} args - Arguments to find a EventDelivery
     * @example
     * // Get one EventDelivery
     * const eventDelivery = await prisma.eventDelivery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventDeliveryFindFirstArgs>(args?: SelectSubset<T, EventDeliveryFindFirstArgs<ExtArgs>>): Prisma__EventDeliveryClient<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventDelivery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDeliveryFindFirstOrThrowArgs} args - Arguments to find a EventDelivery
     * @example
     * // Get one EventDelivery
     * const eventDelivery = await prisma.eventDelivery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventDeliveryFindFirstOrThrowArgs>(args?: SelectSubset<T, EventDeliveryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventDeliveryClient<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventDeliveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDeliveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventDeliveries
     * const eventDeliveries = await prisma.eventDelivery.findMany()
     * 
     * // Get first 10 EventDeliveries
     * const eventDeliveries = await prisma.eventDelivery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventDeliveryWithIdOnly = await prisma.eventDelivery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventDeliveryFindManyArgs>(args?: SelectSubset<T, EventDeliveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventDelivery.
     * @param {EventDeliveryCreateArgs} args - Arguments to create a EventDelivery.
     * @example
     * // Create one EventDelivery
     * const EventDelivery = await prisma.eventDelivery.create({
     *   data: {
     *     // ... data to create a EventDelivery
     *   }
     * })
     * 
     */
    create<T extends EventDeliveryCreateArgs>(args: SelectSubset<T, EventDeliveryCreateArgs<ExtArgs>>): Prisma__EventDeliveryClient<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventDeliveries.
     * @param {EventDeliveryCreateManyArgs} args - Arguments to create many EventDeliveries.
     * @example
     * // Create many EventDeliveries
     * const eventDelivery = await prisma.eventDelivery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventDeliveryCreateManyArgs>(args?: SelectSubset<T, EventDeliveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventDeliveries and returns the data saved in the database.
     * @param {EventDeliveryCreateManyAndReturnArgs} args - Arguments to create many EventDeliveries.
     * @example
     * // Create many EventDeliveries
     * const eventDelivery = await prisma.eventDelivery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventDeliveries and only return the `id`
     * const eventDeliveryWithIdOnly = await prisma.eventDelivery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventDeliveryCreateManyAndReturnArgs>(args?: SelectSubset<T, EventDeliveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventDelivery.
     * @param {EventDeliveryDeleteArgs} args - Arguments to delete one EventDelivery.
     * @example
     * // Delete one EventDelivery
     * const EventDelivery = await prisma.eventDelivery.delete({
     *   where: {
     *     // ... filter to delete one EventDelivery
     *   }
     * })
     * 
     */
    delete<T extends EventDeliveryDeleteArgs>(args: SelectSubset<T, EventDeliveryDeleteArgs<ExtArgs>>): Prisma__EventDeliveryClient<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventDelivery.
     * @param {EventDeliveryUpdateArgs} args - Arguments to update one EventDelivery.
     * @example
     * // Update one EventDelivery
     * const eventDelivery = await prisma.eventDelivery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventDeliveryUpdateArgs>(args: SelectSubset<T, EventDeliveryUpdateArgs<ExtArgs>>): Prisma__EventDeliveryClient<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventDeliveries.
     * @param {EventDeliveryDeleteManyArgs} args - Arguments to filter EventDeliveries to delete.
     * @example
     * // Delete a few EventDeliveries
     * const { count } = await prisma.eventDelivery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeliveryDeleteManyArgs>(args?: SelectSubset<T, EventDeliveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDeliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDeliveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventDeliveries
     * const eventDelivery = await prisma.eventDelivery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventDeliveryUpdateManyArgs>(args: SelectSubset<T, EventDeliveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventDeliveries and returns the data updated in the database.
     * @param {EventDeliveryUpdateManyAndReturnArgs} args - Arguments to update many EventDeliveries.
     * @example
     * // Update many EventDeliveries
     * const eventDelivery = await prisma.eventDelivery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventDeliveries and only return the `id`
     * const eventDeliveryWithIdOnly = await prisma.eventDelivery.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventDeliveryUpdateManyAndReturnArgs>(args: SelectSubset<T, EventDeliveryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventDelivery.
     * @param {EventDeliveryUpsertArgs} args - Arguments to update or create a EventDelivery.
     * @example
     * // Update or create a EventDelivery
     * const eventDelivery = await prisma.eventDelivery.upsert({
     *   create: {
     *     // ... data to create a EventDelivery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventDelivery we want to update
     *   }
     * })
     */
    upsert<T extends EventDeliveryUpsertArgs>(args: SelectSubset<T, EventDeliveryUpsertArgs<ExtArgs>>): Prisma__EventDeliveryClient<$Result.GetResult<Prisma.$EventDeliveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventDeliveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDeliveryCountArgs} args - Arguments to filter EventDeliveries to count.
     * @example
     * // Count the number of EventDeliveries
     * const count = await prisma.eventDelivery.count({
     *   where: {
     *     // ... the filter for the EventDeliveries we want to count
     *   }
     * })
    **/
    count<T extends EventDeliveryCountArgs>(
      args?: Subset<T, EventDeliveryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventDeliveryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventDelivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDeliveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventDeliveryAggregateArgs>(args: Subset<T, EventDeliveryAggregateArgs>): Prisma.PrismaPromise<GetEventDeliveryAggregateType<T>>

    /**
     * Group by EventDelivery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventDeliveryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventDeliveryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventDeliveryGroupByArgs['orderBy'] }
        : { orderBy?: EventDeliveryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventDeliveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventDeliveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EventDelivery model
   */
  readonly fields: EventDeliveryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EventDelivery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventDeliveryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    endpoint<T extends WebhookEndpointDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WebhookEndpointDefaultArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EventDelivery model
   */
  interface EventDeliveryFieldRefs {
    readonly id: FieldRef<"EventDelivery", 'String'>
    readonly eventId: FieldRef<"EventDelivery", 'String'>
    readonly endpointId: FieldRef<"EventDelivery", 'String'>
    readonly attemptNumber: FieldRef<"EventDelivery", 'Int'>
    readonly deliveryStatus: FieldRef<"EventDelivery", 'DeliveryStatus'>
    readonly httpStatusCode: FieldRef<"EventDelivery", 'Int'>
    readonly errorMessage: FieldRef<"EventDelivery", 'String'>
    readonly responseBody: FieldRef<"EventDelivery", 'String'>
    readonly createdAt: FieldRef<"EventDelivery", 'DateTime'>
    readonly deliveredAt: FieldRef<"EventDelivery", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EventDelivery findUnique
   */
  export type EventDeliveryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which EventDelivery to fetch.
     */
    where: EventDeliveryWhereUniqueInput
  }

  /**
   * EventDelivery findUniqueOrThrow
   */
  export type EventDeliveryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which EventDelivery to fetch.
     */
    where: EventDeliveryWhereUniqueInput
  }

  /**
   * EventDelivery findFirst
   */
  export type EventDeliveryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which EventDelivery to fetch.
     */
    where?: EventDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDeliveries to fetch.
     */
    orderBy?: EventDeliveryOrderByWithRelationInput | EventDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDeliveries.
     */
    cursor?: EventDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDeliveries.
     */
    distinct?: EventDeliveryScalarFieldEnum | EventDeliveryScalarFieldEnum[]
  }

  /**
   * EventDelivery findFirstOrThrow
   */
  export type EventDeliveryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which EventDelivery to fetch.
     */
    where?: EventDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDeliveries to fetch.
     */
    orderBy?: EventDeliveryOrderByWithRelationInput | EventDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EventDeliveries.
     */
    cursor?: EventDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDeliveries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EventDeliveries.
     */
    distinct?: EventDeliveryScalarFieldEnum | EventDeliveryScalarFieldEnum[]
  }

  /**
   * EventDelivery findMany
   */
  export type EventDeliveryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * Filter, which EventDeliveries to fetch.
     */
    where?: EventDeliveryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EventDeliveries to fetch.
     */
    orderBy?: EventDeliveryOrderByWithRelationInput | EventDeliveryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EventDeliveries.
     */
    cursor?: EventDeliveryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EventDeliveries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EventDeliveries.
     */
    skip?: number
    distinct?: EventDeliveryScalarFieldEnum | EventDeliveryScalarFieldEnum[]
  }

  /**
   * EventDelivery create
   */
  export type EventDeliveryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * The data needed to create a EventDelivery.
     */
    data: XOR<EventDeliveryCreateInput, EventDeliveryUncheckedCreateInput>
  }

  /**
   * EventDelivery createMany
   */
  export type EventDeliveryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventDeliveries.
     */
    data: EventDeliveryCreateManyInput | EventDeliveryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EventDelivery createManyAndReturn
   */
  export type EventDeliveryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * The data used to create many EventDeliveries.
     */
    data: EventDeliveryCreateManyInput | EventDeliveryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDelivery update
   */
  export type EventDeliveryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * The data needed to update a EventDelivery.
     */
    data: XOR<EventDeliveryUpdateInput, EventDeliveryUncheckedUpdateInput>
    /**
     * Choose, which EventDelivery to update.
     */
    where: EventDeliveryWhereUniqueInput
  }

  /**
   * EventDelivery updateMany
   */
  export type EventDeliveryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EventDeliveries.
     */
    data: XOR<EventDeliveryUpdateManyMutationInput, EventDeliveryUncheckedUpdateManyInput>
    /**
     * Filter which EventDeliveries to update
     */
    where?: EventDeliveryWhereInput
    /**
     * Limit how many EventDeliveries to update.
     */
    limit?: number
  }

  /**
   * EventDelivery updateManyAndReturn
   */
  export type EventDeliveryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * The data used to update EventDeliveries.
     */
    data: XOR<EventDeliveryUpdateManyMutationInput, EventDeliveryUncheckedUpdateManyInput>
    /**
     * Filter which EventDeliveries to update
     */
    where?: EventDeliveryWhereInput
    /**
     * Limit how many EventDeliveries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EventDelivery upsert
   */
  export type EventDeliveryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * The filter to search for the EventDelivery to update in case it exists.
     */
    where: EventDeliveryWhereUniqueInput
    /**
     * In case the EventDelivery found by the `where` argument doesn't exist, create a new EventDelivery with this data.
     */
    create: XOR<EventDeliveryCreateInput, EventDeliveryUncheckedCreateInput>
    /**
     * In case the EventDelivery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventDeliveryUpdateInput, EventDeliveryUncheckedUpdateInput>
  }

  /**
   * EventDelivery delete
   */
  export type EventDeliveryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
    /**
     * Filter which EventDelivery to delete.
     */
    where: EventDeliveryWhereUniqueInput
  }

  /**
   * EventDelivery deleteMany
   */
  export type EventDeliveryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EventDeliveries to delete
     */
    where?: EventDeliveryWhereInput
    /**
     * Limit how many EventDeliveries to delete.
     */
    limit?: number
  }

  /**
   * EventDelivery without action
   */
  export type EventDeliveryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventDelivery
     */
    select?: EventDeliverySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EventDelivery
     */
    omit?: EventDeliveryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventDeliveryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    walletAddress: 'walletAddress',
    verifiedAt: 'verifiedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ApiTokenScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    tokenHash: 'tokenHash',
    environment: 'environment',
    allowedDomains: 'allowedDomains',
    lastUsedAt: 'lastUsedAt',
    requestCount: 'requestCount',
    createdAt: 'createdAt',
    revokedAt: 'revokedAt',
    status: 'status'
  };

  export type ApiTokenScalarFieldEnum = (typeof ApiTokenScalarFieldEnum)[keyof typeof ApiTokenScalarFieldEnum]


  export const WebhookEndpointScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    url: 'url',
    description: 'description',
    secret: 'secret',
    status: 'status',
    eventTypes: 'eventTypes',
    lastTimeHit: 'lastTimeHit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WebhookEndpointScalarFieldEnum = (typeof WebhookEndpointScalarFieldEnum)[keyof typeof WebhookEndpointScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    tokenId: 'tokenId',
    amount: 'amount',
    currency: 'currency',
    recipientAddress: 'recipientAddress',
    txHash: 'txHash',
    blockNumber: 'blockNumber',
    status: 'status',
    failureReason: 'failureReason',
    monitoringStartedAt: 'monitoringStartedAt',
    confirmedAt: 'confirmedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    idempotencyKey: 'idempotencyKey'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    type: 'type',
    sessionId: 'sessionId',
    paymentId: 'paymentId',
    tokenId: 'tokenId',
    metadata: 'metadata',
    occurredAt: 'occurredAt',
    createdAt: 'createdAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    paymentId: 'paymentId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const EventDeliveryScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    endpointId: 'endpointId',
    attemptNumber: 'attemptNumber',
    deliveryStatus: 'deliveryStatus',
    httpStatusCode: 'httpStatusCode',
    errorMessage: 'errorMessage',
    responseBody: 'responseBody',
    createdAt: 'createdAt',
    deliveredAt: 'deliveredAt'
  };

  export type EventDeliveryScalarFieldEnum = (typeof EventDeliveryScalarFieldEnum)[keyof typeof EventDeliveryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TokenEnvironment'
   */
  export type EnumTokenEnvironmentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenEnvironment'>
    


  /**
   * Reference to a field of type 'TokenEnvironment[]'
   */
  export type ListEnumTokenEnvironmentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenEnvironment[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'TokenStatus'
   */
  export type EnumTokenStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenStatus'>
    


  /**
   * Reference to a field of type 'TokenStatus[]'
   */
  export type ListEnumTokenStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenStatus[]'>
    


  /**
   * Reference to a field of type 'WebhookEndpointStatus'
   */
  export type EnumWebhookEndpointStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WebhookEndpointStatus'>
    


  /**
   * Reference to a field of type 'WebhookEndpointStatus[]'
   */
  export type ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WebhookEndpointStatus[]'>
    


  /**
   * Reference to a field of type 'EventType[]'
   */
  export type ListEnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType[]'>
    


  /**
   * Reference to a field of type 'EventType'
   */
  export type EnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'AllowedCurrency'
   */
  export type EnumAllowedCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AllowedCurrency'>
    


  /**
   * Reference to a field of type 'AllowedCurrency[]'
   */
  export type ListEnumAllowedCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AllowedCurrency[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DeliveryStatus'
   */
  export type EnumDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryStatus'>
    


  /**
   * Reference to a field of type 'DeliveryStatus[]'
   */
  export type ListEnumDeliveryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DeliveryStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    walletAddress?: StringNullableFilter<"User"> | string | null
    verifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    projects?: ProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    walletAddress?: StringNullableFilter<"User"> | string | null
    verifiedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    projects?: ProjectListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    walletAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"Verification"> | Date | string | null
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Verification"> | Date | string | null
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    apiTokens?: ApiTokenListRelationFilter
    payments?: PaymentListRelationFilter
    events?: EventListRelationFilter
    webhookEndpoints?: WebhookEndpointListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    apiTokens?: ApiTokenOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
    webhookEndpoints?: WebhookEndpointOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    apiTokens?: ApiTokenListRelationFilter
    payments?: PaymentListRelationFilter
    events?: EventListRelationFilter
    webhookEndpoints?: WebhookEndpointListRelationFilter
  }, "id" | "name">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    name?: StringWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    userId?: StringWithAggregatesFilter<"Project"> | string
  }

  export type ApiTokenWhereInput = {
    AND?: ApiTokenWhereInput | ApiTokenWhereInput[]
    OR?: ApiTokenWhereInput[]
    NOT?: ApiTokenWhereInput | ApiTokenWhereInput[]
    id?: StringFilter<"ApiToken"> | string
    projectId?: StringFilter<"ApiToken"> | string
    tokenHash?: StringFilter<"ApiToken"> | string
    environment?: EnumTokenEnvironmentFilter<"ApiToken"> | $Enums.TokenEnvironment
    allowedDomains?: StringNullableListFilter<"ApiToken">
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    requestCount?: IntFilter<"ApiToken"> | number
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    status?: EnumTokenStatusFilter<"ApiToken"> | $Enums.TokenStatus
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    payments?: PaymentListRelationFilter
    events?: EventListRelationFilter
  }

  export type ApiTokenOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    environment?: SortOrder
    allowedDomains?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    requestCount?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    project?: ProjectOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
  }

  export type ApiTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenHash?: string
    AND?: ApiTokenWhereInput | ApiTokenWhereInput[]
    OR?: ApiTokenWhereInput[]
    NOT?: ApiTokenWhereInput | ApiTokenWhereInput[]
    projectId?: StringFilter<"ApiToken"> | string
    environment?: EnumTokenEnvironmentFilter<"ApiToken"> | $Enums.TokenEnvironment
    allowedDomains?: StringNullableListFilter<"ApiToken">
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    requestCount?: IntFilter<"ApiToken"> | number
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    status?: EnumTokenStatusFilter<"ApiToken"> | $Enums.TokenStatus
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    payments?: PaymentListRelationFilter
    events?: EventListRelationFilter
  }, "id" | "tokenHash">

  export type ApiTokenOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    environment?: SortOrder
    allowedDomains?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    requestCount?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    _count?: ApiTokenCountOrderByAggregateInput
    _avg?: ApiTokenAvgOrderByAggregateInput
    _max?: ApiTokenMaxOrderByAggregateInput
    _min?: ApiTokenMinOrderByAggregateInput
    _sum?: ApiTokenSumOrderByAggregateInput
  }

  export type ApiTokenScalarWhereWithAggregatesInput = {
    AND?: ApiTokenScalarWhereWithAggregatesInput | ApiTokenScalarWhereWithAggregatesInput[]
    OR?: ApiTokenScalarWhereWithAggregatesInput[]
    NOT?: ApiTokenScalarWhereWithAggregatesInput | ApiTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiToken"> | string
    projectId?: StringWithAggregatesFilter<"ApiToken"> | string
    tokenHash?: StringWithAggregatesFilter<"ApiToken"> | string
    environment?: EnumTokenEnvironmentWithAggregatesFilter<"ApiToken"> | $Enums.TokenEnvironment
    allowedDomains?: StringNullableListFilter<"ApiToken">
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiToken"> | Date | string | null
    requestCount?: IntWithAggregatesFilter<"ApiToken"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ApiToken"> | Date | string
    revokedAt?: DateTimeNullableWithAggregatesFilter<"ApiToken"> | Date | string | null
    status?: EnumTokenStatusWithAggregatesFilter<"ApiToken"> | $Enums.TokenStatus
  }

  export type WebhookEndpointWhereInput = {
    AND?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    OR?: WebhookEndpointWhereInput[]
    NOT?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    id?: StringFilter<"WebhookEndpoint"> | string
    projectId?: StringFilter<"WebhookEndpoint"> | string
    url?: StringFilter<"WebhookEndpoint"> | string
    description?: StringNullableFilter<"WebhookEndpoint"> | string | null
    secret?: StringFilter<"WebhookEndpoint"> | string
    status?: EnumWebhookEndpointStatusFilter<"WebhookEndpoint"> | $Enums.WebhookEndpointStatus
    eventTypes?: EnumEventTypeNullableListFilter<"WebhookEndpoint">
    lastTimeHit?: DateTimeNullableFilter<"WebhookEndpoint"> | Date | string | null
    createdAt?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    deliveries?: EventDeliveryListRelationFilter
  }

  export type WebhookEndpointOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    secret?: SortOrder
    status?: SortOrder
    eventTypes?: SortOrder
    lastTimeHit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    deliveries?: EventDeliveryOrderByRelationAggregateInput
  }

  export type WebhookEndpointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    OR?: WebhookEndpointWhereInput[]
    NOT?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    projectId?: StringFilter<"WebhookEndpoint"> | string
    url?: StringFilter<"WebhookEndpoint"> | string
    description?: StringNullableFilter<"WebhookEndpoint"> | string | null
    secret?: StringFilter<"WebhookEndpoint"> | string
    status?: EnumWebhookEndpointStatusFilter<"WebhookEndpoint"> | $Enums.WebhookEndpointStatus
    eventTypes?: EnumEventTypeNullableListFilter<"WebhookEndpoint">
    lastTimeHit?: DateTimeNullableFilter<"WebhookEndpoint"> | Date | string | null
    createdAt?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    deliveries?: EventDeliveryListRelationFilter
  }, "id">

  export type WebhookEndpointOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    url?: SortOrder
    description?: SortOrderInput | SortOrder
    secret?: SortOrder
    status?: SortOrder
    eventTypes?: SortOrder
    lastTimeHit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WebhookEndpointCountOrderByAggregateInput
    _max?: WebhookEndpointMaxOrderByAggregateInput
    _min?: WebhookEndpointMinOrderByAggregateInput
  }

  export type WebhookEndpointScalarWhereWithAggregatesInput = {
    AND?: WebhookEndpointScalarWhereWithAggregatesInput | WebhookEndpointScalarWhereWithAggregatesInput[]
    OR?: WebhookEndpointScalarWhereWithAggregatesInput[]
    NOT?: WebhookEndpointScalarWhereWithAggregatesInput | WebhookEndpointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    projectId?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    url?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    description?: StringNullableWithAggregatesFilter<"WebhookEndpoint"> | string | null
    secret?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    status?: EnumWebhookEndpointStatusWithAggregatesFilter<"WebhookEndpoint"> | $Enums.WebhookEndpointStatus
    eventTypes?: EnumEventTypeNullableListFilter<"WebhookEndpoint">
    lastTimeHit?: DateTimeNullableWithAggregatesFilter<"WebhookEndpoint"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WebhookEndpoint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WebhookEndpoint"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    projectId?: StringFilter<"Payment"> | string
    tokenId?: StringNullableFilter<"Payment"> | string | null
    amount?: BigIntFilter<"Payment"> | bigint | number
    currency?: EnumAllowedCurrencyFilter<"Payment"> | $Enums.AllowedCurrency
    recipientAddress?: StringFilter<"Payment"> | string
    txHash?: StringNullableFilter<"Payment"> | string | null
    blockNumber?: BigIntNullableFilter<"Payment"> | bigint | number | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    failureReason?: StringNullableFilter<"Payment"> | string | null
    monitoringStartedAt?: DateTimeFilter<"Payment"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    idempotencyKey?: StringNullableFilter<"Payment"> | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    token?: XOR<ApiTokenNullableScalarRelationFilter, ApiTokenWhereInput> | null
    products?: ProductListRelationFilter
    events?: EventListRelationFilter
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    recipientAddress?: SortOrder
    txHash?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    failureReason?: SortOrderInput | SortOrder
    monitoringStartedAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    project?: ProjectOrderByWithRelationInput
    token?: ApiTokenOrderByWithRelationInput
    products?: ProductOrderByRelationAggregateInput
    events?: EventOrderByRelationAggregateInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txHash?: string
    idempotencyKey?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    projectId?: StringFilter<"Payment"> | string
    tokenId?: StringNullableFilter<"Payment"> | string | null
    amount?: BigIntFilter<"Payment"> | bigint | number
    currency?: EnumAllowedCurrencyFilter<"Payment"> | $Enums.AllowedCurrency
    recipientAddress?: StringFilter<"Payment"> | string
    blockNumber?: BigIntNullableFilter<"Payment"> | bigint | number | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    failureReason?: StringNullableFilter<"Payment"> | string | null
    monitoringStartedAt?: DateTimeFilter<"Payment"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    token?: XOR<ApiTokenNullableScalarRelationFilter, ApiTokenWhereInput> | null
    products?: ProductListRelationFilter
    events?: EventListRelationFilter
  }, "id" | "txHash" | "idempotencyKey">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    recipientAddress?: SortOrder
    txHash?: SortOrderInput | SortOrder
    blockNumber?: SortOrderInput | SortOrder
    status?: SortOrder
    failureReason?: SortOrderInput | SortOrder
    monitoringStartedAt?: SortOrder
    confirmedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    projectId?: StringWithAggregatesFilter<"Payment"> | string
    tokenId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    amount?: BigIntWithAggregatesFilter<"Payment"> | bigint | number
    currency?: EnumAllowedCurrencyWithAggregatesFilter<"Payment"> | $Enums.AllowedCurrency
    recipientAddress?: StringWithAggregatesFilter<"Payment"> | string
    txHash?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    blockNumber?: BigIntNullableWithAggregatesFilter<"Payment"> | bigint | number | null
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    failureReason?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    monitoringStartedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    confirmedAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    idempotencyKey?: StringNullableWithAggregatesFilter<"Payment"> | string | null
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    projectId?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    sessionId?: StringFilter<"Event"> | string
    paymentId?: StringNullableFilter<"Event"> | string | null
    tokenId?: StringNullableFilter<"Event"> | string | null
    metadata?: JsonNullableFilter<"Event">
    occurredAt?: DateTimeFilter<"Event"> | Date | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
    token?: XOR<ApiTokenNullableScalarRelationFilter, ApiTokenWhereInput> | null
    deliveries?: EventDeliveryListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sessionId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    tokenId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    project?: ProjectOrderByWithRelationInput
    payment?: PaymentOrderByWithRelationInput
    token?: ApiTokenOrderByWithRelationInput
    deliveries?: EventDeliveryOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    projectId?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    paymentId?: StringNullableFilter<"Event"> | string | null
    tokenId?: StringNullableFilter<"Event"> | string | null
    metadata?: JsonNullableFilter<"Event">
    occurredAt?: DateTimeFilter<"Event"> | Date | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    payment?: XOR<PaymentNullableScalarRelationFilter, PaymentWhereInput> | null
    token?: XOR<ApiTokenNullableScalarRelationFilter, ApiTokenWhereInput> | null
    deliveries?: EventDeliveryListRelationFilter
  }, "id" | "sessionId">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sessionId?: SortOrder
    paymentId?: SortOrderInput | SortOrder
    tokenId?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    projectId?: StringWithAggregatesFilter<"Event"> | string
    type?: EnumEventTypeWithAggregatesFilter<"Event"> | $Enums.EventType
    sessionId?: StringWithAggregatesFilter<"Event"> | string
    paymentId?: StringNullableWithAggregatesFilter<"Event"> | string | null
    tokenId?: StringNullableWithAggregatesFilter<"Event"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Event">
    occurredAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    price?: BigIntFilter<"Product"> | bigint | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    paymentId?: StringFilter<"Product"> | string
    payment?: XOR<PaymentScalarRelationFilter, PaymentWhereInput>
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentId?: SortOrder
    payment?: PaymentOrderByWithRelationInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    price?: BigIntFilter<"Product"> | bigint | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    paymentId?: StringFilter<"Product"> | string
    payment?: XOR<PaymentScalarRelationFilter, PaymentWhereInput>
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentId?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    price?: BigIntWithAggregatesFilter<"Product"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    paymentId?: StringWithAggregatesFilter<"Product"> | string
  }

  export type EventDeliveryWhereInput = {
    AND?: EventDeliveryWhereInput | EventDeliveryWhereInput[]
    OR?: EventDeliveryWhereInput[]
    NOT?: EventDeliveryWhereInput | EventDeliveryWhereInput[]
    id?: StringFilter<"EventDelivery"> | string
    eventId?: StringFilter<"EventDelivery"> | string
    endpointId?: StringFilter<"EventDelivery"> | string
    attemptNumber?: IntFilter<"EventDelivery"> | number
    deliveryStatus?: EnumDeliveryStatusFilter<"EventDelivery"> | $Enums.DeliveryStatus
    httpStatusCode?: IntNullableFilter<"EventDelivery"> | number | null
    errorMessage?: StringNullableFilter<"EventDelivery"> | string | null
    responseBody?: StringNullableFilter<"EventDelivery"> | string | null
    createdAt?: DateTimeFilter<"EventDelivery"> | Date | string
    deliveredAt?: DateTimeNullableFilter<"EventDelivery"> | Date | string | null
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    endpoint?: XOR<WebhookEndpointScalarRelationFilter, WebhookEndpointWhereInput>
  }

  export type EventDeliveryOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    endpointId?: SortOrder
    attemptNumber?: SortOrder
    deliveryStatus?: SortOrder
    httpStatusCode?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    event?: EventOrderByWithRelationInput
    endpoint?: WebhookEndpointOrderByWithRelationInput
  }

  export type EventDeliveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventDeliveryWhereInput | EventDeliveryWhereInput[]
    OR?: EventDeliveryWhereInput[]
    NOT?: EventDeliveryWhereInput | EventDeliveryWhereInput[]
    eventId?: StringFilter<"EventDelivery"> | string
    endpointId?: StringFilter<"EventDelivery"> | string
    attemptNumber?: IntFilter<"EventDelivery"> | number
    deliveryStatus?: EnumDeliveryStatusFilter<"EventDelivery"> | $Enums.DeliveryStatus
    httpStatusCode?: IntNullableFilter<"EventDelivery"> | number | null
    errorMessage?: StringNullableFilter<"EventDelivery"> | string | null
    responseBody?: StringNullableFilter<"EventDelivery"> | string | null
    createdAt?: DateTimeFilter<"EventDelivery"> | Date | string
    deliveredAt?: DateTimeNullableFilter<"EventDelivery"> | Date | string | null
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    endpoint?: XOR<WebhookEndpointScalarRelationFilter, WebhookEndpointWhereInput>
  }, "id">

  export type EventDeliveryOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    endpointId?: SortOrder
    attemptNumber?: SortOrder
    deliveryStatus?: SortOrder
    httpStatusCode?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrderInput | SortOrder
    _count?: EventDeliveryCountOrderByAggregateInput
    _avg?: EventDeliveryAvgOrderByAggregateInput
    _max?: EventDeliveryMaxOrderByAggregateInput
    _min?: EventDeliveryMinOrderByAggregateInput
    _sum?: EventDeliverySumOrderByAggregateInput
  }

  export type EventDeliveryScalarWhereWithAggregatesInput = {
    AND?: EventDeliveryScalarWhereWithAggregatesInput | EventDeliveryScalarWhereWithAggregatesInput[]
    OR?: EventDeliveryScalarWhereWithAggregatesInput[]
    NOT?: EventDeliveryScalarWhereWithAggregatesInput | EventDeliveryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EventDelivery"> | string
    eventId?: StringWithAggregatesFilter<"EventDelivery"> | string
    endpointId?: StringWithAggregatesFilter<"EventDelivery"> | string
    attemptNumber?: IntWithAggregatesFilter<"EventDelivery"> | number
    deliveryStatus?: EnumDeliveryStatusWithAggregatesFilter<"EventDelivery"> | $Enums.DeliveryStatus
    httpStatusCode?: IntNullableWithAggregatesFilter<"EventDelivery"> | number | null
    errorMessage?: StringNullableWithAggregatesFilter<"EventDelivery"> | string | null
    responseBody?: StringNullableWithAggregatesFilter<"EventDelivery"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EventDelivery"> | Date | string
    deliveredAt?: DateTimeNullableWithAggregatesFilter<"EventDelivery"> | Date | string | null
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    apiTokens?: ApiTokenCreateNestedManyWithoutProjectInput
    payments?: PaymentCreateNestedManyWithoutProjectInput
    events?: EventCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutProjectInput
    payments?: PaymentUncheckedCreateNestedManyWithoutProjectInput
    events?: EventUncheckedCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutProjectNestedInput
    payments?: PaymentUpdateManyWithoutProjectNestedInput
    events?: EventUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutProjectNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutProjectNestedInput
    events?: EventUncheckedUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ApiTokenCreateInput = {
    id?: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
    project: ProjectCreateNestedOneWithoutApiTokensInput
    payments?: PaymentCreateNestedManyWithoutTokenInput
    events?: EventCreateNestedManyWithoutTokenInput
  }

  export type ApiTokenUncheckedCreateInput = {
    id?: string
    projectId: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
    payments?: PaymentUncheckedCreateNestedManyWithoutTokenInput
    events?: EventUncheckedCreateNestedManyWithoutTokenInput
  }

  export type ApiTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
    project?: ProjectUpdateOneRequiredWithoutApiTokensNestedInput
    payments?: PaymentUpdateManyWithoutTokenNestedInput
    events?: EventUpdateManyWithoutTokenNestedInput
  }

  export type ApiTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
    payments?: PaymentUncheckedUpdateManyWithoutTokenNestedInput
    events?: EventUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type ApiTokenCreateManyInput = {
    id?: string
    projectId: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
  }

  export type ApiTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
  }

  export type ApiTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
  }

  export type WebhookEndpointCreateInput = {
    id?: string
    url: string
    description?: string | null
    secret: string
    status?: $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointCreateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutWebhookEndpointsInput
    deliveries?: EventDeliveryCreateNestedManyWithoutEndpointInput
  }

  export type WebhookEndpointUncheckedCreateInput = {
    id?: string
    projectId: string
    url: string
    description?: string | null
    secret: string
    status?: $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointCreateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: EventDeliveryUncheckedCreateNestedManyWithoutEndpointInput
  }

  export type WebhookEndpointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutWebhookEndpointsNestedInput
    deliveries?: EventDeliveryUpdateManyWithoutEndpointNestedInput
  }

  export type WebhookEndpointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: EventDeliveryUncheckedUpdateManyWithoutEndpointNestedInput
  }

  export type WebhookEndpointCreateManyInput = {
    id?: string
    projectId: string
    url: string
    description?: string | null
    secret: string
    status?: $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointCreateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookEndpointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    project: ProjectCreateNestedOneWithoutPaymentsInput
    token?: ApiTokenCreateNestedOneWithoutPaymentsInput
    products?: ProductCreateNestedManyWithoutPaymentInput
    events?: EventCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    projectId: string
    tokenId?: string | null
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutPaymentInput
    events?: EventUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutPaymentsNestedInput
    token?: ApiTokenUpdateOneWithoutPaymentsNestedInput
    products?: ProductUpdateManyWithoutPaymentNestedInput
    events?: EventUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutPaymentNestedInput
    events?: EventUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentCreateManyInput = {
    id?: string
    projectId: string
    tokenId?: string | null
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateInput = {
    id?: string
    type: $Enums.EventType
    sessionId?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutEventsInput
    payment?: PaymentCreateNestedOneWithoutEventsInput
    token?: ApiTokenCreateNestedOneWithoutEventsInput
    deliveries?: EventDeliveryCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    projectId: string
    type: $Enums.EventType
    sessionId?: string
    paymentId?: string | null
    tokenId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    deliveries?: EventDeliveryUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutEventsNestedInput
    payment?: PaymentUpdateOneWithoutEventsNestedInput
    token?: ApiTokenUpdateOneWithoutEventsNestedInput
    deliveries?: EventDeliveryUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: EventDeliveryUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    projectId: string
    type: $Enums.EventType
    sessionId?: string
    paymentId?: string | null
    tokenId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    price: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: PaymentCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    price: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentId: string
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    price: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentId: string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type EventDeliveryCreateInput = {
    id?: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
    event: EventCreateNestedOneWithoutDeliveriesInput
    endpoint: WebhookEndpointCreateNestedOneWithoutDeliveriesInput
  }

  export type EventDeliveryUncheckedCreateInput = {
    id?: string
    eventId: string
    endpointId: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type EventDeliveryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    event?: EventUpdateOneRequiredWithoutDeliveriesNestedInput
    endpoint?: WebhookEndpointUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type EventDeliveryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    endpointId?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventDeliveryCreateManyInput = {
    id?: string
    eventId: string
    endpointId: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type EventDeliveryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventDeliveryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    endpointId?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrder
    verifiedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrder
    verifiedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    walletAddress?: SortOrder
    verifiedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiTokenListRelationFilter = {
    every?: ApiTokenWhereInput
    some?: ApiTokenWhereInput
    none?: ApiTokenWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type WebhookEndpointListRelationFilter = {
    every?: WebhookEndpointWhereInput
    some?: WebhookEndpointWhereInput
    none?: WebhookEndpointWhereInput
  }

  export type ApiTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebhookEndpointOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type EnumTokenEnvironmentFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenEnvironment | EnumTokenEnvironmentFieldRefInput<$PrismaModel>
    in?: $Enums.TokenEnvironment[] | ListEnumTokenEnvironmentFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenEnvironment[] | ListEnumTokenEnvironmentFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenEnvironmentFilter<$PrismaModel> | $Enums.TokenEnvironment
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumTokenStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenStatus | EnumTokenStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TokenStatus[] | ListEnumTokenStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenStatus[] | ListEnumTokenStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenStatusFilter<$PrismaModel> | $Enums.TokenStatus
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ApiTokenCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    environment?: SortOrder
    allowedDomains?: SortOrder
    lastUsedAt?: SortOrder
    requestCount?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    status?: SortOrder
  }

  export type ApiTokenAvgOrderByAggregateInput = {
    requestCount?: SortOrder
  }

  export type ApiTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    environment?: SortOrder
    lastUsedAt?: SortOrder
    requestCount?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    status?: SortOrder
  }

  export type ApiTokenMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenHash?: SortOrder
    environment?: SortOrder
    lastUsedAt?: SortOrder
    requestCount?: SortOrder
    createdAt?: SortOrder
    revokedAt?: SortOrder
    status?: SortOrder
  }

  export type ApiTokenSumOrderByAggregateInput = {
    requestCount?: SortOrder
  }

  export type EnumTokenEnvironmentWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenEnvironment | EnumTokenEnvironmentFieldRefInput<$PrismaModel>
    in?: $Enums.TokenEnvironment[] | ListEnumTokenEnvironmentFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenEnvironment[] | ListEnumTokenEnvironmentFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenEnvironmentWithAggregatesFilter<$PrismaModel> | $Enums.TokenEnvironment
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenEnvironmentFilter<$PrismaModel>
    _max?: NestedEnumTokenEnvironmentFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTokenStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenStatus | EnumTokenStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TokenStatus[] | ListEnumTokenStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenStatus[] | ListEnumTokenStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenStatusWithAggregatesFilter<$PrismaModel> | $Enums.TokenStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenStatusFilter<$PrismaModel>
    _max?: NestedEnumTokenStatusFilter<$PrismaModel>
  }

  export type EnumWebhookEndpointStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WebhookEndpointStatus | EnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WebhookEndpointStatus[] | ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebhookEndpointStatus[] | ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWebhookEndpointStatusFilter<$PrismaModel> | $Enums.WebhookEndpointStatus
  }

  export type EnumEventTypeNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel> | null
    has?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    hasSome?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EventDeliveryListRelationFilter = {
    every?: EventDeliveryWhereInput
    some?: EventDeliveryWhereInput
    none?: EventDeliveryWhereInput
  }

  export type EventDeliveryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebhookEndpointCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    url?: SortOrder
    description?: SortOrder
    secret?: SortOrder
    status?: SortOrder
    eventTypes?: SortOrder
    lastTimeHit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEndpointMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    url?: SortOrder
    description?: SortOrder
    secret?: SortOrder
    status?: SortOrder
    lastTimeHit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookEndpointMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    url?: SortOrder
    description?: SortOrder
    secret?: SortOrder
    status?: SortOrder
    lastTimeHit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumWebhookEndpointStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WebhookEndpointStatus | EnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WebhookEndpointStatus[] | ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebhookEndpointStatus[] | ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWebhookEndpointStatusWithAggregatesFilter<$PrismaModel> | $Enums.WebhookEndpointStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWebhookEndpointStatusFilter<$PrismaModel>
    _max?: NestedEnumWebhookEndpointStatusFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EnumAllowedCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.AllowedCurrency | EnumAllowedCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.AllowedCurrency[] | ListEnumAllowedCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.AllowedCurrency[] | ListEnumAllowedCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumAllowedCurrencyFilter<$PrismaModel> | $Enums.AllowedCurrency
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type ApiTokenNullableScalarRelationFilter = {
    is?: ApiTokenWhereInput | null
    isNot?: ApiTokenWhereInput | null
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    recipientAddress?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    monitoringStartedAt?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    idempotencyKey?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    blockNumber?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    recipientAddress?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    monitoringStartedAt?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    idempotencyKey?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    tokenId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    recipientAddress?: SortOrder
    txHash?: SortOrder
    blockNumber?: SortOrder
    status?: SortOrder
    failureReason?: SortOrder
    monitoringStartedAt?: SortOrder
    confirmedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    idempotencyKey?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    blockNumber?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumAllowedCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AllowedCurrency | EnumAllowedCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.AllowedCurrency[] | ListEnumAllowedCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.AllowedCurrency[] | ListEnumAllowedCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumAllowedCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.AllowedCurrency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAllowedCurrencyFilter<$PrismaModel>
    _max?: NestedEnumAllowedCurrencyFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PaymentNullableScalarRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sessionId?: SortOrder
    paymentId?: SortOrder
    tokenId?: SortOrder
    metadata?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sessionId?: SortOrder
    paymentId?: SortOrder
    tokenId?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    type?: SortOrder
    sessionId?: SortOrder
    paymentId?: SortOrder
    tokenId?: SortOrder
    occurredAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PaymentScalarRelationFilter = {
    is?: PaymentWhereInput
    isNot?: PaymentWhereInput
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    paymentId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type EnumDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryStatus | EnumDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeliveryStatusFilter<$PrismaModel> | $Enums.DeliveryStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type WebhookEndpointScalarRelationFilter = {
    is?: WebhookEndpointWhereInput
    isNot?: WebhookEndpointWhereInput
  }

  export type EventDeliveryCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    endpointId?: SortOrder
    attemptNumber?: SortOrder
    deliveryStatus?: SortOrder
    httpStatusCode?: SortOrder
    errorMessage?: SortOrder
    responseBody?: SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrder
  }

  export type EventDeliveryAvgOrderByAggregateInput = {
    attemptNumber?: SortOrder
    httpStatusCode?: SortOrder
  }

  export type EventDeliveryMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    endpointId?: SortOrder
    attemptNumber?: SortOrder
    deliveryStatus?: SortOrder
    httpStatusCode?: SortOrder
    errorMessage?: SortOrder
    responseBody?: SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrder
  }

  export type EventDeliveryMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    endpointId?: SortOrder
    attemptNumber?: SortOrder
    deliveryStatus?: SortOrder
    httpStatusCode?: SortOrder
    errorMessage?: SortOrder
    responseBody?: SortOrder
    createdAt?: SortOrder
    deliveredAt?: SortOrder
  }

  export type EventDeliverySumOrderByAggregateInput = {
    attemptNumber?: SortOrder
    httpStatusCode?: SortOrder
  }

  export type EnumDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryStatus | EnumDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeliveryStatusFilter<$PrismaModel>
    _max?: NestedEnumDeliveryStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ApiTokenCreateNestedManyWithoutProjectInput = {
    create?: XOR<ApiTokenCreateWithoutProjectInput, ApiTokenUncheckedCreateWithoutProjectInput> | ApiTokenCreateWithoutProjectInput[] | ApiTokenUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutProjectInput | ApiTokenCreateOrConnectWithoutProjectInput[]
    createMany?: ApiTokenCreateManyProjectInputEnvelope
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutProjectInput = {
    create?: XOR<PaymentCreateWithoutProjectInput, PaymentUncheckedCreateWithoutProjectInput> | PaymentCreateWithoutProjectInput[] | PaymentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutProjectInput | PaymentCreateOrConnectWithoutProjectInput[]
    createMany?: PaymentCreateManyProjectInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutProjectInput = {
    create?: XOR<EventCreateWithoutProjectInput, EventUncheckedCreateWithoutProjectInput> | EventCreateWithoutProjectInput[] | EventUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EventCreateOrConnectWithoutProjectInput | EventCreateOrConnectWithoutProjectInput[]
    createMany?: EventCreateManyProjectInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type WebhookEndpointCreateNestedManyWithoutProjectInput = {
    create?: XOR<WebhookEndpointCreateWithoutProjectInput, WebhookEndpointUncheckedCreateWithoutProjectInput> | WebhookEndpointCreateWithoutProjectInput[] | WebhookEndpointUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutProjectInput | WebhookEndpointCreateOrConnectWithoutProjectInput[]
    createMany?: WebhookEndpointCreateManyProjectInputEnvelope
    connect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
  }

  export type ApiTokenUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ApiTokenCreateWithoutProjectInput, ApiTokenUncheckedCreateWithoutProjectInput> | ApiTokenCreateWithoutProjectInput[] | ApiTokenUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutProjectInput | ApiTokenCreateOrConnectWithoutProjectInput[]
    createMany?: ApiTokenCreateManyProjectInputEnvelope
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<PaymentCreateWithoutProjectInput, PaymentUncheckedCreateWithoutProjectInput> | PaymentCreateWithoutProjectInput[] | PaymentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutProjectInput | PaymentCreateOrConnectWithoutProjectInput[]
    createMany?: PaymentCreateManyProjectInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<EventCreateWithoutProjectInput, EventUncheckedCreateWithoutProjectInput> | EventCreateWithoutProjectInput[] | EventUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EventCreateOrConnectWithoutProjectInput | EventCreateOrConnectWithoutProjectInput[]
    createMany?: EventCreateManyProjectInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type WebhookEndpointUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<WebhookEndpointCreateWithoutProjectInput, WebhookEndpointUncheckedCreateWithoutProjectInput> | WebhookEndpointCreateWithoutProjectInput[] | WebhookEndpointUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutProjectInput | WebhookEndpointCreateOrConnectWithoutProjectInput[]
    createMany?: WebhookEndpointCreateManyProjectInputEnvelope
    connect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ApiTokenUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ApiTokenCreateWithoutProjectInput, ApiTokenUncheckedCreateWithoutProjectInput> | ApiTokenCreateWithoutProjectInput[] | ApiTokenUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutProjectInput | ApiTokenCreateOrConnectWithoutProjectInput[]
    upsert?: ApiTokenUpsertWithWhereUniqueWithoutProjectInput | ApiTokenUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ApiTokenCreateManyProjectInputEnvelope
    set?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    disconnect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    delete?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    update?: ApiTokenUpdateWithWhereUniqueWithoutProjectInput | ApiTokenUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ApiTokenUpdateManyWithWhereWithoutProjectInput | ApiTokenUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PaymentCreateWithoutProjectInput, PaymentUncheckedCreateWithoutProjectInput> | PaymentCreateWithoutProjectInput[] | PaymentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutProjectInput | PaymentCreateOrConnectWithoutProjectInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutProjectInput | PaymentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PaymentCreateManyProjectInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutProjectInput | PaymentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutProjectInput | PaymentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type EventUpdateManyWithoutProjectNestedInput = {
    create?: XOR<EventCreateWithoutProjectInput, EventUncheckedCreateWithoutProjectInput> | EventCreateWithoutProjectInput[] | EventUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EventCreateOrConnectWithoutProjectInput | EventCreateOrConnectWithoutProjectInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutProjectInput | EventUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: EventCreateManyProjectInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutProjectInput | EventUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: EventUpdateManyWithWhereWithoutProjectInput | EventUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type WebhookEndpointUpdateManyWithoutProjectNestedInput = {
    create?: XOR<WebhookEndpointCreateWithoutProjectInput, WebhookEndpointUncheckedCreateWithoutProjectInput> | WebhookEndpointCreateWithoutProjectInput[] | WebhookEndpointUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutProjectInput | WebhookEndpointCreateOrConnectWithoutProjectInput[]
    upsert?: WebhookEndpointUpsertWithWhereUniqueWithoutProjectInput | WebhookEndpointUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: WebhookEndpointCreateManyProjectInputEnvelope
    set?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    disconnect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    delete?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    connect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    update?: WebhookEndpointUpdateWithWhereUniqueWithoutProjectInput | WebhookEndpointUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: WebhookEndpointUpdateManyWithWhereWithoutProjectInput | WebhookEndpointUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: WebhookEndpointScalarWhereInput | WebhookEndpointScalarWhereInput[]
  }

  export type ApiTokenUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ApiTokenCreateWithoutProjectInput, ApiTokenUncheckedCreateWithoutProjectInput> | ApiTokenCreateWithoutProjectInput[] | ApiTokenUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ApiTokenCreateOrConnectWithoutProjectInput | ApiTokenCreateOrConnectWithoutProjectInput[]
    upsert?: ApiTokenUpsertWithWhereUniqueWithoutProjectInput | ApiTokenUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ApiTokenCreateManyProjectInputEnvelope
    set?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    disconnect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    delete?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    connect?: ApiTokenWhereUniqueInput | ApiTokenWhereUniqueInput[]
    update?: ApiTokenUpdateWithWhereUniqueWithoutProjectInput | ApiTokenUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ApiTokenUpdateManyWithWhereWithoutProjectInput | ApiTokenUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<PaymentCreateWithoutProjectInput, PaymentUncheckedCreateWithoutProjectInput> | PaymentCreateWithoutProjectInput[] | PaymentUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutProjectInput | PaymentCreateOrConnectWithoutProjectInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutProjectInput | PaymentUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: PaymentCreateManyProjectInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutProjectInput | PaymentUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutProjectInput | PaymentUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<EventCreateWithoutProjectInput, EventUncheckedCreateWithoutProjectInput> | EventCreateWithoutProjectInput[] | EventUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: EventCreateOrConnectWithoutProjectInput | EventCreateOrConnectWithoutProjectInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutProjectInput | EventUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: EventCreateManyProjectInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutProjectInput | EventUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: EventUpdateManyWithWhereWithoutProjectInput | EventUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type WebhookEndpointUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<WebhookEndpointCreateWithoutProjectInput, WebhookEndpointUncheckedCreateWithoutProjectInput> | WebhookEndpointCreateWithoutProjectInput[] | WebhookEndpointUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutProjectInput | WebhookEndpointCreateOrConnectWithoutProjectInput[]
    upsert?: WebhookEndpointUpsertWithWhereUniqueWithoutProjectInput | WebhookEndpointUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: WebhookEndpointCreateManyProjectInputEnvelope
    set?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    disconnect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    delete?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    connect?: WebhookEndpointWhereUniqueInput | WebhookEndpointWhereUniqueInput[]
    update?: WebhookEndpointUpdateWithWhereUniqueWithoutProjectInput | WebhookEndpointUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: WebhookEndpointUpdateManyWithWhereWithoutProjectInput | WebhookEndpointUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: WebhookEndpointScalarWhereInput | WebhookEndpointScalarWhereInput[]
  }

  export type ApiTokenCreateallowedDomainsInput = {
    set: string[]
  }

  export type ProjectCreateNestedOneWithoutApiTokensInput = {
    create?: XOR<ProjectCreateWithoutApiTokensInput, ProjectUncheckedCreateWithoutApiTokensInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutApiTokensInput
    connect?: ProjectWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutTokenInput = {
    create?: XOR<PaymentCreateWithoutTokenInput, PaymentUncheckedCreateWithoutTokenInput> | PaymentCreateWithoutTokenInput[] | PaymentUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutTokenInput | PaymentCreateOrConnectWithoutTokenInput[]
    createMany?: PaymentCreateManyTokenInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutTokenInput = {
    create?: XOR<EventCreateWithoutTokenInput, EventUncheckedCreateWithoutTokenInput> | EventCreateWithoutTokenInput[] | EventUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTokenInput | EventCreateOrConnectWithoutTokenInput[]
    createMany?: EventCreateManyTokenInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<PaymentCreateWithoutTokenInput, PaymentUncheckedCreateWithoutTokenInput> | PaymentCreateWithoutTokenInput[] | PaymentUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutTokenInput | PaymentCreateOrConnectWithoutTokenInput[]
    createMany?: PaymentCreateManyTokenInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutTokenInput = {
    create?: XOR<EventCreateWithoutTokenInput, EventUncheckedCreateWithoutTokenInput> | EventCreateWithoutTokenInput[] | EventUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTokenInput | EventCreateOrConnectWithoutTokenInput[]
    createMany?: EventCreateManyTokenInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type EnumTokenEnvironmentFieldUpdateOperationsInput = {
    set?: $Enums.TokenEnvironment
  }

  export type ApiTokenUpdateallowedDomainsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTokenStatusFieldUpdateOperationsInput = {
    set?: $Enums.TokenStatus
  }

  export type ProjectUpdateOneRequiredWithoutApiTokensNestedInput = {
    create?: XOR<ProjectCreateWithoutApiTokensInput, ProjectUncheckedCreateWithoutApiTokensInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutApiTokensInput
    upsert?: ProjectUpsertWithoutApiTokensInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutApiTokensInput, ProjectUpdateWithoutApiTokensInput>, ProjectUncheckedUpdateWithoutApiTokensInput>
  }

  export type PaymentUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PaymentCreateWithoutTokenInput, PaymentUncheckedCreateWithoutTokenInput> | PaymentCreateWithoutTokenInput[] | PaymentUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutTokenInput | PaymentCreateOrConnectWithoutTokenInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutTokenInput | PaymentUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PaymentCreateManyTokenInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutTokenInput | PaymentUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutTokenInput | PaymentUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type EventUpdateManyWithoutTokenNestedInput = {
    create?: XOR<EventCreateWithoutTokenInput, EventUncheckedCreateWithoutTokenInput> | EventCreateWithoutTokenInput[] | EventUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTokenInput | EventCreateOrConnectWithoutTokenInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutTokenInput | EventUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: EventCreateManyTokenInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutTokenInput | EventUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: EventUpdateManyWithWhereWithoutTokenInput | EventUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<PaymentCreateWithoutTokenInput, PaymentUncheckedCreateWithoutTokenInput> | PaymentCreateWithoutTokenInput[] | PaymentUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutTokenInput | PaymentCreateOrConnectWithoutTokenInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutTokenInput | PaymentUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: PaymentCreateManyTokenInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutTokenInput | PaymentUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutTokenInput | PaymentUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutTokenNestedInput = {
    create?: XOR<EventCreateWithoutTokenInput, EventUncheckedCreateWithoutTokenInput> | EventCreateWithoutTokenInput[] | EventUncheckedCreateWithoutTokenInput[]
    connectOrCreate?: EventCreateOrConnectWithoutTokenInput | EventCreateOrConnectWithoutTokenInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutTokenInput | EventUpsertWithWhereUniqueWithoutTokenInput[]
    createMany?: EventCreateManyTokenInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutTokenInput | EventUpdateWithWhereUniqueWithoutTokenInput[]
    updateMany?: EventUpdateManyWithWhereWithoutTokenInput | EventUpdateManyWithWhereWithoutTokenInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type WebhookEndpointCreateeventTypesInput = {
    set: $Enums.EventType[]
  }

  export type ProjectCreateNestedOneWithoutWebhookEndpointsInput = {
    create?: XOR<ProjectCreateWithoutWebhookEndpointsInput, ProjectUncheckedCreateWithoutWebhookEndpointsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutWebhookEndpointsInput
    connect?: ProjectWhereUniqueInput
  }

  export type EventDeliveryCreateNestedManyWithoutEndpointInput = {
    create?: XOR<EventDeliveryCreateWithoutEndpointInput, EventDeliveryUncheckedCreateWithoutEndpointInput> | EventDeliveryCreateWithoutEndpointInput[] | EventDeliveryUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: EventDeliveryCreateOrConnectWithoutEndpointInput | EventDeliveryCreateOrConnectWithoutEndpointInput[]
    createMany?: EventDeliveryCreateManyEndpointInputEnvelope
    connect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
  }

  export type EventDeliveryUncheckedCreateNestedManyWithoutEndpointInput = {
    create?: XOR<EventDeliveryCreateWithoutEndpointInput, EventDeliveryUncheckedCreateWithoutEndpointInput> | EventDeliveryCreateWithoutEndpointInput[] | EventDeliveryUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: EventDeliveryCreateOrConnectWithoutEndpointInput | EventDeliveryCreateOrConnectWithoutEndpointInput[]
    createMany?: EventDeliveryCreateManyEndpointInputEnvelope
    connect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
  }

  export type EnumWebhookEndpointStatusFieldUpdateOperationsInput = {
    set?: $Enums.WebhookEndpointStatus
  }

  export type WebhookEndpointUpdateeventTypesInput = {
    set?: $Enums.EventType[]
    push?: $Enums.EventType | $Enums.EventType[]
  }

  export type ProjectUpdateOneRequiredWithoutWebhookEndpointsNestedInput = {
    create?: XOR<ProjectCreateWithoutWebhookEndpointsInput, ProjectUncheckedCreateWithoutWebhookEndpointsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutWebhookEndpointsInput
    upsert?: ProjectUpsertWithoutWebhookEndpointsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutWebhookEndpointsInput, ProjectUpdateWithoutWebhookEndpointsInput>, ProjectUncheckedUpdateWithoutWebhookEndpointsInput>
  }

  export type EventDeliveryUpdateManyWithoutEndpointNestedInput = {
    create?: XOR<EventDeliveryCreateWithoutEndpointInput, EventDeliveryUncheckedCreateWithoutEndpointInput> | EventDeliveryCreateWithoutEndpointInput[] | EventDeliveryUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: EventDeliveryCreateOrConnectWithoutEndpointInput | EventDeliveryCreateOrConnectWithoutEndpointInput[]
    upsert?: EventDeliveryUpsertWithWhereUniqueWithoutEndpointInput | EventDeliveryUpsertWithWhereUniqueWithoutEndpointInput[]
    createMany?: EventDeliveryCreateManyEndpointInputEnvelope
    set?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    disconnect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    delete?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    connect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    update?: EventDeliveryUpdateWithWhereUniqueWithoutEndpointInput | EventDeliveryUpdateWithWhereUniqueWithoutEndpointInput[]
    updateMany?: EventDeliveryUpdateManyWithWhereWithoutEndpointInput | EventDeliveryUpdateManyWithWhereWithoutEndpointInput[]
    deleteMany?: EventDeliveryScalarWhereInput | EventDeliveryScalarWhereInput[]
  }

  export type EventDeliveryUncheckedUpdateManyWithoutEndpointNestedInput = {
    create?: XOR<EventDeliveryCreateWithoutEndpointInput, EventDeliveryUncheckedCreateWithoutEndpointInput> | EventDeliveryCreateWithoutEndpointInput[] | EventDeliveryUncheckedCreateWithoutEndpointInput[]
    connectOrCreate?: EventDeliveryCreateOrConnectWithoutEndpointInput | EventDeliveryCreateOrConnectWithoutEndpointInput[]
    upsert?: EventDeliveryUpsertWithWhereUniqueWithoutEndpointInput | EventDeliveryUpsertWithWhereUniqueWithoutEndpointInput[]
    createMany?: EventDeliveryCreateManyEndpointInputEnvelope
    set?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    disconnect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    delete?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    connect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    update?: EventDeliveryUpdateWithWhereUniqueWithoutEndpointInput | EventDeliveryUpdateWithWhereUniqueWithoutEndpointInput[]
    updateMany?: EventDeliveryUpdateManyWithWhereWithoutEndpointInput | EventDeliveryUpdateManyWithWhereWithoutEndpointInput[]
    deleteMany?: EventDeliveryScalarWhereInput | EventDeliveryScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<ProjectCreateWithoutPaymentsInput, ProjectUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPaymentsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ApiTokenCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<ApiTokenCreateWithoutPaymentsInput, ApiTokenUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: ApiTokenCreateOrConnectWithoutPaymentsInput
    connect?: ApiTokenWhereUniqueInput
  }

  export type ProductCreateNestedManyWithoutPaymentInput = {
    create?: XOR<ProductCreateWithoutPaymentInput, ProductUncheckedCreateWithoutPaymentInput> | ProductCreateWithoutPaymentInput[] | ProductUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutPaymentInput | ProductCreateOrConnectWithoutPaymentInput[]
    createMany?: ProductCreateManyPaymentInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutPaymentInput = {
    create?: XOR<EventCreateWithoutPaymentInput, EventUncheckedCreateWithoutPaymentInput> | EventCreateWithoutPaymentInput[] | EventUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: EventCreateOrConnectWithoutPaymentInput | EventCreateOrConnectWithoutPaymentInput[]
    createMany?: EventCreateManyPaymentInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutPaymentInput = {
    create?: XOR<ProductCreateWithoutPaymentInput, ProductUncheckedCreateWithoutPaymentInput> | ProductCreateWithoutPaymentInput[] | ProductUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutPaymentInput | ProductCreateOrConnectWithoutPaymentInput[]
    createMany?: ProductCreateManyPaymentInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutPaymentInput = {
    create?: XOR<EventCreateWithoutPaymentInput, EventUncheckedCreateWithoutPaymentInput> | EventCreateWithoutPaymentInput[] | EventUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: EventCreateOrConnectWithoutPaymentInput | EventCreateOrConnectWithoutPaymentInput[]
    createMany?: EventCreateManyPaymentInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumAllowedCurrencyFieldUpdateOperationsInput = {
    set?: $Enums.AllowedCurrency
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type ProjectUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<ProjectCreateWithoutPaymentsInput, ProjectUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPaymentsInput
    upsert?: ProjectUpsertWithoutPaymentsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutPaymentsInput, ProjectUpdateWithoutPaymentsInput>, ProjectUncheckedUpdateWithoutPaymentsInput>
  }

  export type ApiTokenUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<ApiTokenCreateWithoutPaymentsInput, ApiTokenUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: ApiTokenCreateOrConnectWithoutPaymentsInput
    upsert?: ApiTokenUpsertWithoutPaymentsInput
    disconnect?: ApiTokenWhereInput | boolean
    delete?: ApiTokenWhereInput | boolean
    connect?: ApiTokenWhereUniqueInput
    update?: XOR<XOR<ApiTokenUpdateToOneWithWhereWithoutPaymentsInput, ApiTokenUpdateWithoutPaymentsInput>, ApiTokenUncheckedUpdateWithoutPaymentsInput>
  }

  export type ProductUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<ProductCreateWithoutPaymentInput, ProductUncheckedCreateWithoutPaymentInput> | ProductCreateWithoutPaymentInput[] | ProductUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutPaymentInput | ProductCreateOrConnectWithoutPaymentInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutPaymentInput | ProductUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: ProductCreateManyPaymentInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutPaymentInput | ProductUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutPaymentInput | ProductUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type EventUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<EventCreateWithoutPaymentInput, EventUncheckedCreateWithoutPaymentInput> | EventCreateWithoutPaymentInput[] | EventUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: EventCreateOrConnectWithoutPaymentInput | EventCreateOrConnectWithoutPaymentInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutPaymentInput | EventUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: EventCreateManyPaymentInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutPaymentInput | EventUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: EventUpdateManyWithWhereWithoutPaymentInput | EventUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<ProductCreateWithoutPaymentInput, ProductUncheckedCreateWithoutPaymentInput> | ProductCreateWithoutPaymentInput[] | ProductUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutPaymentInput | ProductCreateOrConnectWithoutPaymentInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutPaymentInput | ProductUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: ProductCreateManyPaymentInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutPaymentInput | ProductUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutPaymentInput | ProductUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<EventCreateWithoutPaymentInput, EventUncheckedCreateWithoutPaymentInput> | EventCreateWithoutPaymentInput[] | EventUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: EventCreateOrConnectWithoutPaymentInput | EventCreateOrConnectWithoutPaymentInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutPaymentInput | EventUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: EventCreateManyPaymentInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutPaymentInput | EventUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: EventUpdateManyWithWhereWithoutPaymentInput | EventUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutEventsInput = {
    create?: XOR<ProjectCreateWithoutEventsInput, ProjectUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutEventsInput
    connect?: ProjectWhereUniqueInput
  }

  export type PaymentCreateNestedOneWithoutEventsInput = {
    create?: XOR<PaymentCreateWithoutEventsInput, PaymentUncheckedCreateWithoutEventsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutEventsInput
    connect?: PaymentWhereUniqueInput
  }

  export type ApiTokenCreateNestedOneWithoutEventsInput = {
    create?: XOR<ApiTokenCreateWithoutEventsInput, ApiTokenUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ApiTokenCreateOrConnectWithoutEventsInput
    connect?: ApiTokenWhereUniqueInput
  }

  export type EventDeliveryCreateNestedManyWithoutEventInput = {
    create?: XOR<EventDeliveryCreateWithoutEventInput, EventDeliveryUncheckedCreateWithoutEventInput> | EventDeliveryCreateWithoutEventInput[] | EventDeliveryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDeliveryCreateOrConnectWithoutEventInput | EventDeliveryCreateOrConnectWithoutEventInput[]
    createMany?: EventDeliveryCreateManyEventInputEnvelope
    connect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
  }

  export type EventDeliveryUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<EventDeliveryCreateWithoutEventInput, EventDeliveryUncheckedCreateWithoutEventInput> | EventDeliveryCreateWithoutEventInput[] | EventDeliveryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDeliveryCreateOrConnectWithoutEventInput | EventDeliveryCreateOrConnectWithoutEventInput[]
    createMany?: EventDeliveryCreateManyEventInputEnvelope
    connect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
  }

  export type EnumEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.EventType
  }

  export type ProjectUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<ProjectCreateWithoutEventsInput, ProjectUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutEventsInput
    upsert?: ProjectUpsertWithoutEventsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutEventsInput, ProjectUpdateWithoutEventsInput>, ProjectUncheckedUpdateWithoutEventsInput>
  }

  export type PaymentUpdateOneWithoutEventsNestedInput = {
    create?: XOR<PaymentCreateWithoutEventsInput, PaymentUncheckedCreateWithoutEventsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutEventsInput
    upsert?: PaymentUpsertWithoutEventsInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutEventsInput, PaymentUpdateWithoutEventsInput>, PaymentUncheckedUpdateWithoutEventsInput>
  }

  export type ApiTokenUpdateOneWithoutEventsNestedInput = {
    create?: XOR<ApiTokenCreateWithoutEventsInput, ApiTokenUncheckedCreateWithoutEventsInput>
    connectOrCreate?: ApiTokenCreateOrConnectWithoutEventsInput
    upsert?: ApiTokenUpsertWithoutEventsInput
    disconnect?: ApiTokenWhereInput | boolean
    delete?: ApiTokenWhereInput | boolean
    connect?: ApiTokenWhereUniqueInput
    update?: XOR<XOR<ApiTokenUpdateToOneWithWhereWithoutEventsInput, ApiTokenUpdateWithoutEventsInput>, ApiTokenUncheckedUpdateWithoutEventsInput>
  }

  export type EventDeliveryUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventDeliveryCreateWithoutEventInput, EventDeliveryUncheckedCreateWithoutEventInput> | EventDeliveryCreateWithoutEventInput[] | EventDeliveryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDeliveryCreateOrConnectWithoutEventInput | EventDeliveryCreateOrConnectWithoutEventInput[]
    upsert?: EventDeliveryUpsertWithWhereUniqueWithoutEventInput | EventDeliveryUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventDeliveryCreateManyEventInputEnvelope
    set?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    disconnect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    delete?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    connect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    update?: EventDeliveryUpdateWithWhereUniqueWithoutEventInput | EventDeliveryUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventDeliveryUpdateManyWithWhereWithoutEventInput | EventDeliveryUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventDeliveryScalarWhereInput | EventDeliveryScalarWhereInput[]
  }

  export type EventDeliveryUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<EventDeliveryCreateWithoutEventInput, EventDeliveryUncheckedCreateWithoutEventInput> | EventDeliveryCreateWithoutEventInput[] | EventDeliveryUncheckedCreateWithoutEventInput[]
    connectOrCreate?: EventDeliveryCreateOrConnectWithoutEventInput | EventDeliveryCreateOrConnectWithoutEventInput[]
    upsert?: EventDeliveryUpsertWithWhereUniqueWithoutEventInput | EventDeliveryUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: EventDeliveryCreateManyEventInputEnvelope
    set?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    disconnect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    delete?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    connect?: EventDeliveryWhereUniqueInput | EventDeliveryWhereUniqueInput[]
    update?: EventDeliveryUpdateWithWhereUniqueWithoutEventInput | EventDeliveryUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: EventDeliveryUpdateManyWithWhereWithoutEventInput | EventDeliveryUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: EventDeliveryScalarWhereInput | EventDeliveryScalarWhereInput[]
  }

  export type PaymentCreateNestedOneWithoutProductsInput = {
    create?: XOR<PaymentCreateWithoutProductsInput, PaymentUncheckedCreateWithoutProductsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutProductsInput
    connect?: PaymentWhereUniqueInput
  }

  export type PaymentUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<PaymentCreateWithoutProductsInput, PaymentUncheckedCreateWithoutProductsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutProductsInput
    upsert?: PaymentUpsertWithoutProductsInput
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutProductsInput, PaymentUpdateWithoutProductsInput>, PaymentUncheckedUpdateWithoutProductsInput>
  }

  export type EventCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<EventCreateWithoutDeliveriesInput, EventUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: EventCreateOrConnectWithoutDeliveriesInput
    connect?: EventWhereUniqueInput
  }

  export type WebhookEndpointCreateNestedOneWithoutDeliveriesInput = {
    create?: XOR<WebhookEndpointCreateWithoutDeliveriesInput, WebhookEndpointUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutDeliveriesInput
    connect?: WebhookEndpointWhereUniqueInput
  }

  export type EnumDeliveryStatusFieldUpdateOperationsInput = {
    set?: $Enums.DeliveryStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<EventCreateWithoutDeliveriesInput, EventUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: EventCreateOrConnectWithoutDeliveriesInput
    upsert?: EventUpsertWithoutDeliveriesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutDeliveriesInput, EventUpdateWithoutDeliveriesInput>, EventUncheckedUpdateWithoutDeliveriesInput>
  }

  export type WebhookEndpointUpdateOneRequiredWithoutDeliveriesNestedInput = {
    create?: XOR<WebhookEndpointCreateWithoutDeliveriesInput, WebhookEndpointUncheckedCreateWithoutDeliveriesInput>
    connectOrCreate?: WebhookEndpointCreateOrConnectWithoutDeliveriesInput
    upsert?: WebhookEndpointUpsertWithoutDeliveriesInput
    connect?: WebhookEndpointWhereUniqueInput
    update?: XOR<XOR<WebhookEndpointUpdateToOneWithWhereWithoutDeliveriesInput, WebhookEndpointUpdateWithoutDeliveriesInput>, WebhookEndpointUncheckedUpdateWithoutDeliveriesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTokenEnvironmentFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenEnvironment | EnumTokenEnvironmentFieldRefInput<$PrismaModel>
    in?: $Enums.TokenEnvironment[] | ListEnumTokenEnvironmentFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenEnvironment[] | ListEnumTokenEnvironmentFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenEnvironmentFilter<$PrismaModel> | $Enums.TokenEnvironment
  }

  export type NestedEnumTokenStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenStatus | EnumTokenStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TokenStatus[] | ListEnumTokenStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenStatus[] | ListEnumTokenStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenStatusFilter<$PrismaModel> | $Enums.TokenStatus
  }

  export type NestedEnumTokenEnvironmentWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenEnvironment | EnumTokenEnvironmentFieldRefInput<$PrismaModel>
    in?: $Enums.TokenEnvironment[] | ListEnumTokenEnvironmentFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenEnvironment[] | ListEnumTokenEnvironmentFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenEnvironmentWithAggregatesFilter<$PrismaModel> | $Enums.TokenEnvironment
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenEnvironmentFilter<$PrismaModel>
    _max?: NestedEnumTokenEnvironmentFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTokenStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenStatus | EnumTokenStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TokenStatus[] | ListEnumTokenStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenStatus[] | ListEnumTokenStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenStatusWithAggregatesFilter<$PrismaModel> | $Enums.TokenStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenStatusFilter<$PrismaModel>
    _max?: NestedEnumTokenStatusFilter<$PrismaModel>
  }

  export type NestedEnumWebhookEndpointStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WebhookEndpointStatus | EnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WebhookEndpointStatus[] | ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebhookEndpointStatus[] | ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWebhookEndpointStatusFilter<$PrismaModel> | $Enums.WebhookEndpointStatus
  }

  export type NestedEnumWebhookEndpointStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WebhookEndpointStatus | EnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WebhookEndpointStatus[] | ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WebhookEndpointStatus[] | ListEnumWebhookEndpointStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWebhookEndpointStatusWithAggregatesFilter<$PrismaModel> | $Enums.WebhookEndpointStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWebhookEndpointStatusFilter<$PrismaModel>
    _max?: NestedEnumWebhookEndpointStatusFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedEnumAllowedCurrencyFilter<$PrismaModel = never> = {
    equals?: $Enums.AllowedCurrency | EnumAllowedCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.AllowedCurrency[] | ListEnumAllowedCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.AllowedCurrency[] | ListEnumAllowedCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumAllowedCurrencyFilter<$PrismaModel> | $Enums.AllowedCurrency
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumAllowedCurrencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AllowedCurrency | EnumAllowedCurrencyFieldRefInput<$PrismaModel>
    in?: $Enums.AllowedCurrency[] | ListEnumAllowedCurrencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.AllowedCurrency[] | ListEnumAllowedCurrencyFieldRefInput<$PrismaModel>
    not?: NestedEnumAllowedCurrencyWithAggregatesFilter<$PrismaModel> | $Enums.AllowedCurrency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAllowedCurrencyFilter<$PrismaModel>
    _max?: NestedEnumAllowedCurrencyFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeFilter<$PrismaModel> | $Enums.EventType
  }

  export type NestedEnumEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventType | EnumEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventType[] | ListEnumEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.EventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventTypeFilter<$PrismaModel>
    _max?: NestedEnumEventTypeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumDeliveryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryStatus | EnumDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeliveryStatusFilter<$PrismaModel> | $Enums.DeliveryStatus
  }

  export type NestedEnumDeliveryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DeliveryStatus | EnumDeliveryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DeliveryStatus[] | ListEnumDeliveryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDeliveryStatusWithAggregatesFilter<$PrismaModel> | $Enums.DeliveryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDeliveryStatusFilter<$PrismaModel>
    _max?: NestedEnumDeliveryStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    apiTokens?: ApiTokenCreateNestedManyWithoutProjectInput
    payments?: PaymentCreateNestedManyWithoutProjectInput
    events?: EventCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutProjectInput
    payments?: PaymentUncheckedCreateNestedManyWithoutProjectInput
    events?: EventUncheckedCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    name?: StringFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    userId?: StringFilter<"Project"> | string
  }

  export type UserCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    walletAddress?: string | null
    verifiedAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ApiTokenCreateWithoutProjectInput = {
    id?: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
    payments?: PaymentCreateNestedManyWithoutTokenInput
    events?: EventCreateNestedManyWithoutTokenInput
  }

  export type ApiTokenUncheckedCreateWithoutProjectInput = {
    id?: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
    payments?: PaymentUncheckedCreateNestedManyWithoutTokenInput
    events?: EventUncheckedCreateNestedManyWithoutTokenInput
  }

  export type ApiTokenCreateOrConnectWithoutProjectInput = {
    where: ApiTokenWhereUniqueInput
    create: XOR<ApiTokenCreateWithoutProjectInput, ApiTokenUncheckedCreateWithoutProjectInput>
  }

  export type ApiTokenCreateManyProjectInputEnvelope = {
    data: ApiTokenCreateManyProjectInput | ApiTokenCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutProjectInput = {
    id?: string
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    token?: ApiTokenCreateNestedOneWithoutPaymentsInput
    products?: ProductCreateNestedManyWithoutPaymentInput
    events?: EventCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutProjectInput = {
    id?: string
    tokenId?: string | null
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutPaymentInput
    events?: EventUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutProjectInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutProjectInput, PaymentUncheckedCreateWithoutProjectInput>
  }

  export type PaymentCreateManyProjectInputEnvelope = {
    data: PaymentCreateManyProjectInput | PaymentCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutProjectInput = {
    id?: string
    type: $Enums.EventType
    sessionId?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    payment?: PaymentCreateNestedOneWithoutEventsInput
    token?: ApiTokenCreateNestedOneWithoutEventsInput
    deliveries?: EventDeliveryCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutProjectInput = {
    id?: string
    type: $Enums.EventType
    sessionId?: string
    paymentId?: string | null
    tokenId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    deliveries?: EventDeliveryUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutProjectInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutProjectInput, EventUncheckedCreateWithoutProjectInput>
  }

  export type EventCreateManyProjectInputEnvelope = {
    data: EventCreateManyProjectInput | EventCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type WebhookEndpointCreateWithoutProjectInput = {
    id?: string
    url: string
    description?: string | null
    secret: string
    status?: $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointCreateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: EventDeliveryCreateNestedManyWithoutEndpointInput
  }

  export type WebhookEndpointUncheckedCreateWithoutProjectInput = {
    id?: string
    url: string
    description?: string | null
    secret: string
    status?: $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointCreateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    deliveries?: EventDeliveryUncheckedCreateNestedManyWithoutEndpointInput
  }

  export type WebhookEndpointCreateOrConnectWithoutProjectInput = {
    where: WebhookEndpointWhereUniqueInput
    create: XOR<WebhookEndpointCreateWithoutProjectInput, WebhookEndpointUncheckedCreateWithoutProjectInput>
  }

  export type WebhookEndpointCreateManyProjectInputEnvelope = {
    data: WebhookEndpointCreateManyProjectInput | WebhookEndpointCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ApiTokenUpsertWithWhereUniqueWithoutProjectInput = {
    where: ApiTokenWhereUniqueInput
    update: XOR<ApiTokenUpdateWithoutProjectInput, ApiTokenUncheckedUpdateWithoutProjectInput>
    create: XOR<ApiTokenCreateWithoutProjectInput, ApiTokenUncheckedCreateWithoutProjectInput>
  }

  export type ApiTokenUpdateWithWhereUniqueWithoutProjectInput = {
    where: ApiTokenWhereUniqueInput
    data: XOR<ApiTokenUpdateWithoutProjectInput, ApiTokenUncheckedUpdateWithoutProjectInput>
  }

  export type ApiTokenUpdateManyWithWhereWithoutProjectInput = {
    where: ApiTokenScalarWhereInput
    data: XOR<ApiTokenUpdateManyMutationInput, ApiTokenUncheckedUpdateManyWithoutProjectInput>
  }

  export type ApiTokenScalarWhereInput = {
    AND?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
    OR?: ApiTokenScalarWhereInput[]
    NOT?: ApiTokenScalarWhereInput | ApiTokenScalarWhereInput[]
    id?: StringFilter<"ApiToken"> | string
    projectId?: StringFilter<"ApiToken"> | string
    tokenHash?: StringFilter<"ApiToken"> | string
    environment?: EnumTokenEnvironmentFilter<"ApiToken"> | $Enums.TokenEnvironment
    allowedDomains?: StringNullableListFilter<"ApiToken">
    lastUsedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    requestCount?: IntFilter<"ApiToken"> | number
    createdAt?: DateTimeFilter<"ApiToken"> | Date | string
    revokedAt?: DateTimeNullableFilter<"ApiToken"> | Date | string | null
    status?: EnumTokenStatusFilter<"ApiToken"> | $Enums.TokenStatus
  }

  export type PaymentUpsertWithWhereUniqueWithoutProjectInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutProjectInput, PaymentUncheckedUpdateWithoutProjectInput>
    create: XOR<PaymentCreateWithoutProjectInput, PaymentUncheckedCreateWithoutProjectInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutProjectInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutProjectInput, PaymentUncheckedUpdateWithoutProjectInput>
  }

  export type PaymentUpdateManyWithWhereWithoutProjectInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutProjectInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    projectId?: StringFilter<"Payment"> | string
    tokenId?: StringNullableFilter<"Payment"> | string | null
    amount?: BigIntFilter<"Payment"> | bigint | number
    currency?: EnumAllowedCurrencyFilter<"Payment"> | $Enums.AllowedCurrency
    recipientAddress?: StringFilter<"Payment"> | string
    txHash?: StringNullableFilter<"Payment"> | string | null
    blockNumber?: BigIntNullableFilter<"Payment"> | bigint | number | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    failureReason?: StringNullableFilter<"Payment"> | string | null
    monitoringStartedAt?: DateTimeFilter<"Payment"> | Date | string
    confirmedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    idempotencyKey?: StringNullableFilter<"Payment"> | string | null
  }

  export type EventUpsertWithWhereUniqueWithoutProjectInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutProjectInput, EventUncheckedUpdateWithoutProjectInput>
    create: XOR<EventCreateWithoutProjectInput, EventUncheckedCreateWithoutProjectInput>
  }

  export type EventUpdateWithWhereUniqueWithoutProjectInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutProjectInput, EventUncheckedUpdateWithoutProjectInput>
  }

  export type EventUpdateManyWithWhereWithoutProjectInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutProjectInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    projectId?: StringFilter<"Event"> | string
    type?: EnumEventTypeFilter<"Event"> | $Enums.EventType
    sessionId?: StringFilter<"Event"> | string
    paymentId?: StringNullableFilter<"Event"> | string | null
    tokenId?: StringNullableFilter<"Event"> | string | null
    metadata?: JsonNullableFilter<"Event">
    occurredAt?: DateTimeFilter<"Event"> | Date | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
  }

  export type WebhookEndpointUpsertWithWhereUniqueWithoutProjectInput = {
    where: WebhookEndpointWhereUniqueInput
    update: XOR<WebhookEndpointUpdateWithoutProjectInput, WebhookEndpointUncheckedUpdateWithoutProjectInput>
    create: XOR<WebhookEndpointCreateWithoutProjectInput, WebhookEndpointUncheckedCreateWithoutProjectInput>
  }

  export type WebhookEndpointUpdateWithWhereUniqueWithoutProjectInput = {
    where: WebhookEndpointWhereUniqueInput
    data: XOR<WebhookEndpointUpdateWithoutProjectInput, WebhookEndpointUncheckedUpdateWithoutProjectInput>
  }

  export type WebhookEndpointUpdateManyWithWhereWithoutProjectInput = {
    where: WebhookEndpointScalarWhereInput
    data: XOR<WebhookEndpointUpdateManyMutationInput, WebhookEndpointUncheckedUpdateManyWithoutProjectInput>
  }

  export type WebhookEndpointScalarWhereInput = {
    AND?: WebhookEndpointScalarWhereInput | WebhookEndpointScalarWhereInput[]
    OR?: WebhookEndpointScalarWhereInput[]
    NOT?: WebhookEndpointScalarWhereInput | WebhookEndpointScalarWhereInput[]
    id?: StringFilter<"WebhookEndpoint"> | string
    projectId?: StringFilter<"WebhookEndpoint"> | string
    url?: StringFilter<"WebhookEndpoint"> | string
    description?: StringNullableFilter<"WebhookEndpoint"> | string | null
    secret?: StringFilter<"WebhookEndpoint"> | string
    status?: EnumWebhookEndpointStatusFilter<"WebhookEndpoint"> | $Enums.WebhookEndpointStatus
    eventTypes?: EnumEventTypeNullableListFilter<"WebhookEndpoint">
    lastTimeHit?: DateTimeNullableFilter<"WebhookEndpoint"> | Date | string | null
    createdAt?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookEndpoint"> | Date | string
  }

  export type ProjectCreateWithoutApiTokensInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    payments?: PaymentCreateNestedManyWithoutProjectInput
    events?: EventCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutApiTokensInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    payments?: PaymentUncheckedCreateNestedManyWithoutProjectInput
    events?: EventUncheckedCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutApiTokensInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutApiTokensInput, ProjectUncheckedCreateWithoutApiTokensInput>
  }

  export type PaymentCreateWithoutTokenInput = {
    id?: string
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    project: ProjectCreateNestedOneWithoutPaymentsInput
    products?: ProductCreateNestedManyWithoutPaymentInput
    events?: EventCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutTokenInput = {
    id?: string
    projectId: string
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutPaymentInput
    events?: EventUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutTokenInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutTokenInput, PaymentUncheckedCreateWithoutTokenInput>
  }

  export type PaymentCreateManyTokenInputEnvelope = {
    data: PaymentCreateManyTokenInput | PaymentCreateManyTokenInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutTokenInput = {
    id?: string
    type: $Enums.EventType
    sessionId?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutEventsInput
    payment?: PaymentCreateNestedOneWithoutEventsInput
    deliveries?: EventDeliveryCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutTokenInput = {
    id?: string
    projectId: string
    type: $Enums.EventType
    sessionId?: string
    paymentId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    deliveries?: EventDeliveryUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutTokenInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutTokenInput, EventUncheckedCreateWithoutTokenInput>
  }

  export type EventCreateManyTokenInputEnvelope = {
    data: EventCreateManyTokenInput | EventCreateManyTokenInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutApiTokensInput = {
    update: XOR<ProjectUpdateWithoutApiTokensInput, ProjectUncheckedUpdateWithoutApiTokensInput>
    create: XOR<ProjectCreateWithoutApiTokensInput, ProjectUncheckedCreateWithoutApiTokensInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutApiTokensInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutApiTokensInput, ProjectUncheckedUpdateWithoutApiTokensInput>
  }

  export type ProjectUpdateWithoutApiTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    payments?: PaymentUpdateManyWithoutProjectNestedInput
    events?: EventUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutApiTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    payments?: PaymentUncheckedUpdateManyWithoutProjectNestedInput
    events?: EventUncheckedUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type PaymentUpsertWithWhereUniqueWithoutTokenInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutTokenInput, PaymentUncheckedUpdateWithoutTokenInput>
    create: XOR<PaymentCreateWithoutTokenInput, PaymentUncheckedCreateWithoutTokenInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutTokenInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutTokenInput, PaymentUncheckedUpdateWithoutTokenInput>
  }

  export type PaymentUpdateManyWithWhereWithoutTokenInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutTokenInput>
  }

  export type EventUpsertWithWhereUniqueWithoutTokenInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutTokenInput, EventUncheckedUpdateWithoutTokenInput>
    create: XOR<EventCreateWithoutTokenInput, EventUncheckedCreateWithoutTokenInput>
  }

  export type EventUpdateWithWhereUniqueWithoutTokenInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutTokenInput, EventUncheckedUpdateWithoutTokenInput>
  }

  export type EventUpdateManyWithWhereWithoutTokenInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutTokenInput>
  }

  export type ProjectCreateWithoutWebhookEndpointsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    apiTokens?: ApiTokenCreateNestedManyWithoutProjectInput
    payments?: PaymentCreateNestedManyWithoutProjectInput
    events?: EventCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutWebhookEndpointsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutProjectInput
    payments?: PaymentUncheckedCreateNestedManyWithoutProjectInput
    events?: EventUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutWebhookEndpointsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutWebhookEndpointsInput, ProjectUncheckedCreateWithoutWebhookEndpointsInput>
  }

  export type EventDeliveryCreateWithoutEndpointInput = {
    id?: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
    event: EventCreateNestedOneWithoutDeliveriesInput
  }

  export type EventDeliveryUncheckedCreateWithoutEndpointInput = {
    id?: string
    eventId: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type EventDeliveryCreateOrConnectWithoutEndpointInput = {
    where: EventDeliveryWhereUniqueInput
    create: XOR<EventDeliveryCreateWithoutEndpointInput, EventDeliveryUncheckedCreateWithoutEndpointInput>
  }

  export type EventDeliveryCreateManyEndpointInputEnvelope = {
    data: EventDeliveryCreateManyEndpointInput | EventDeliveryCreateManyEndpointInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutWebhookEndpointsInput = {
    update: XOR<ProjectUpdateWithoutWebhookEndpointsInput, ProjectUncheckedUpdateWithoutWebhookEndpointsInput>
    create: XOR<ProjectCreateWithoutWebhookEndpointsInput, ProjectUncheckedCreateWithoutWebhookEndpointsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutWebhookEndpointsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutWebhookEndpointsInput, ProjectUncheckedUpdateWithoutWebhookEndpointsInput>
  }

  export type ProjectUpdateWithoutWebhookEndpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutProjectNestedInput
    payments?: PaymentUpdateManyWithoutProjectNestedInput
    events?: EventUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutWebhookEndpointsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutProjectNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutProjectNestedInput
    events?: EventUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type EventDeliveryUpsertWithWhereUniqueWithoutEndpointInput = {
    where: EventDeliveryWhereUniqueInput
    update: XOR<EventDeliveryUpdateWithoutEndpointInput, EventDeliveryUncheckedUpdateWithoutEndpointInput>
    create: XOR<EventDeliveryCreateWithoutEndpointInput, EventDeliveryUncheckedCreateWithoutEndpointInput>
  }

  export type EventDeliveryUpdateWithWhereUniqueWithoutEndpointInput = {
    where: EventDeliveryWhereUniqueInput
    data: XOR<EventDeliveryUpdateWithoutEndpointInput, EventDeliveryUncheckedUpdateWithoutEndpointInput>
  }

  export type EventDeliveryUpdateManyWithWhereWithoutEndpointInput = {
    where: EventDeliveryScalarWhereInput
    data: XOR<EventDeliveryUpdateManyMutationInput, EventDeliveryUncheckedUpdateManyWithoutEndpointInput>
  }

  export type EventDeliveryScalarWhereInput = {
    AND?: EventDeliveryScalarWhereInput | EventDeliveryScalarWhereInput[]
    OR?: EventDeliveryScalarWhereInput[]
    NOT?: EventDeliveryScalarWhereInput | EventDeliveryScalarWhereInput[]
    id?: StringFilter<"EventDelivery"> | string
    eventId?: StringFilter<"EventDelivery"> | string
    endpointId?: StringFilter<"EventDelivery"> | string
    attemptNumber?: IntFilter<"EventDelivery"> | number
    deliveryStatus?: EnumDeliveryStatusFilter<"EventDelivery"> | $Enums.DeliveryStatus
    httpStatusCode?: IntNullableFilter<"EventDelivery"> | number | null
    errorMessage?: StringNullableFilter<"EventDelivery"> | string | null
    responseBody?: StringNullableFilter<"EventDelivery"> | string | null
    createdAt?: DateTimeFilter<"EventDelivery"> | Date | string
    deliveredAt?: DateTimeNullableFilter<"EventDelivery"> | Date | string | null
  }

  export type ProjectCreateWithoutPaymentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    apiTokens?: ApiTokenCreateNestedManyWithoutProjectInput
    events?: EventCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutProjectInput
    events?: EventUncheckedCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutPaymentsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutPaymentsInput, ProjectUncheckedCreateWithoutPaymentsInput>
  }

  export type ApiTokenCreateWithoutPaymentsInput = {
    id?: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
    project: ProjectCreateNestedOneWithoutApiTokensInput
    events?: EventCreateNestedManyWithoutTokenInput
  }

  export type ApiTokenUncheckedCreateWithoutPaymentsInput = {
    id?: string
    projectId: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
    events?: EventUncheckedCreateNestedManyWithoutTokenInput
  }

  export type ApiTokenCreateOrConnectWithoutPaymentsInput = {
    where: ApiTokenWhereUniqueInput
    create: XOR<ApiTokenCreateWithoutPaymentsInput, ApiTokenUncheckedCreateWithoutPaymentsInput>
  }

  export type ProductCreateWithoutPaymentInput = {
    id?: string
    name: string
    price: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUncheckedCreateWithoutPaymentInput = {
    id?: string
    name: string
    price: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutPaymentInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutPaymentInput, ProductUncheckedCreateWithoutPaymentInput>
  }

  export type ProductCreateManyPaymentInputEnvelope = {
    data: ProductCreateManyPaymentInput | ProductCreateManyPaymentInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutPaymentInput = {
    id?: string
    type: $Enums.EventType
    sessionId?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutEventsInput
    token?: ApiTokenCreateNestedOneWithoutEventsInput
    deliveries?: EventDeliveryCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutPaymentInput = {
    id?: string
    projectId: string
    type: $Enums.EventType
    sessionId?: string
    tokenId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    deliveries?: EventDeliveryUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutPaymentInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutPaymentInput, EventUncheckedCreateWithoutPaymentInput>
  }

  export type EventCreateManyPaymentInputEnvelope = {
    data: EventCreateManyPaymentInput | EventCreateManyPaymentInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutPaymentsInput = {
    update: XOR<ProjectUpdateWithoutPaymentsInput, ProjectUncheckedUpdateWithoutPaymentsInput>
    create: XOR<ProjectCreateWithoutPaymentsInput, ProjectUncheckedCreateWithoutPaymentsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutPaymentsInput, ProjectUncheckedUpdateWithoutPaymentsInput>
  }

  export type ProjectUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutProjectNestedInput
    events?: EventUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutProjectNestedInput
    events?: EventUncheckedUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ApiTokenUpsertWithoutPaymentsInput = {
    update: XOR<ApiTokenUpdateWithoutPaymentsInput, ApiTokenUncheckedUpdateWithoutPaymentsInput>
    create: XOR<ApiTokenCreateWithoutPaymentsInput, ApiTokenUncheckedCreateWithoutPaymentsInput>
    where?: ApiTokenWhereInput
  }

  export type ApiTokenUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: ApiTokenWhereInput
    data: XOR<ApiTokenUpdateWithoutPaymentsInput, ApiTokenUncheckedUpdateWithoutPaymentsInput>
  }

  export type ApiTokenUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
    project?: ProjectUpdateOneRequiredWithoutApiTokensNestedInput
    events?: EventUpdateManyWithoutTokenNestedInput
  }

  export type ApiTokenUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
    events?: EventUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type ProductUpsertWithWhereUniqueWithoutPaymentInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutPaymentInput, ProductUncheckedUpdateWithoutPaymentInput>
    create: XOR<ProductCreateWithoutPaymentInput, ProductUncheckedCreateWithoutPaymentInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutPaymentInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutPaymentInput, ProductUncheckedUpdateWithoutPaymentInput>
  }

  export type ProductUpdateManyWithWhereWithoutPaymentInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutPaymentInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    price?: BigIntFilter<"Product"> | bigint | number
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    paymentId?: StringFilter<"Product"> | string
  }

  export type EventUpsertWithWhereUniqueWithoutPaymentInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutPaymentInput, EventUncheckedUpdateWithoutPaymentInput>
    create: XOR<EventCreateWithoutPaymentInput, EventUncheckedCreateWithoutPaymentInput>
  }

  export type EventUpdateWithWhereUniqueWithoutPaymentInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutPaymentInput, EventUncheckedUpdateWithoutPaymentInput>
  }

  export type EventUpdateManyWithWhereWithoutPaymentInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutPaymentInput>
  }

  export type ProjectCreateWithoutEventsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    apiTokens?: ApiTokenCreateNestedManyWithoutProjectInput
    payments?: PaymentCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    apiTokens?: ApiTokenUncheckedCreateNestedManyWithoutProjectInput
    payments?: PaymentUncheckedCreateNestedManyWithoutProjectInput
    webhookEndpoints?: WebhookEndpointUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutEventsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutEventsInput, ProjectUncheckedCreateWithoutEventsInput>
  }

  export type PaymentCreateWithoutEventsInput = {
    id?: string
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    project: ProjectCreateNestedOneWithoutPaymentsInput
    token?: ApiTokenCreateNestedOneWithoutPaymentsInput
    products?: ProductCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutEventsInput = {
    id?: string
    projectId: string
    tokenId?: string | null
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    products?: ProductUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutEventsInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutEventsInput, PaymentUncheckedCreateWithoutEventsInput>
  }

  export type ApiTokenCreateWithoutEventsInput = {
    id?: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
    project: ProjectCreateNestedOneWithoutApiTokensInput
    payments?: PaymentCreateNestedManyWithoutTokenInput
  }

  export type ApiTokenUncheckedCreateWithoutEventsInput = {
    id?: string
    projectId: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
    payments?: PaymentUncheckedCreateNestedManyWithoutTokenInput
  }

  export type ApiTokenCreateOrConnectWithoutEventsInput = {
    where: ApiTokenWhereUniqueInput
    create: XOR<ApiTokenCreateWithoutEventsInput, ApiTokenUncheckedCreateWithoutEventsInput>
  }

  export type EventDeliveryCreateWithoutEventInput = {
    id?: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
    endpoint: WebhookEndpointCreateNestedOneWithoutDeliveriesInput
  }

  export type EventDeliveryUncheckedCreateWithoutEventInput = {
    id?: string
    endpointId: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type EventDeliveryCreateOrConnectWithoutEventInput = {
    where: EventDeliveryWhereUniqueInput
    create: XOR<EventDeliveryCreateWithoutEventInput, EventDeliveryUncheckedCreateWithoutEventInput>
  }

  export type EventDeliveryCreateManyEventInputEnvelope = {
    data: EventDeliveryCreateManyEventInput | EventDeliveryCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutEventsInput = {
    update: XOR<ProjectUpdateWithoutEventsInput, ProjectUncheckedUpdateWithoutEventsInput>
    create: XOR<ProjectCreateWithoutEventsInput, ProjectUncheckedCreateWithoutEventsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutEventsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutEventsInput, ProjectUncheckedUpdateWithoutEventsInput>
  }

  export type ProjectUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    apiTokens?: ApiTokenUpdateManyWithoutProjectNestedInput
    payments?: PaymentUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutProjectNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type PaymentUpsertWithoutEventsInput = {
    update: XOR<PaymentUpdateWithoutEventsInput, PaymentUncheckedUpdateWithoutEventsInput>
    create: XOR<PaymentCreateWithoutEventsInput, PaymentUncheckedCreateWithoutEventsInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutEventsInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutEventsInput, PaymentUncheckedUpdateWithoutEventsInput>
  }

  export type PaymentUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutPaymentsNestedInput
    token?: ApiTokenUpdateOneWithoutPaymentsNestedInput
    products?: ProductUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type ApiTokenUpsertWithoutEventsInput = {
    update: XOR<ApiTokenUpdateWithoutEventsInput, ApiTokenUncheckedUpdateWithoutEventsInput>
    create: XOR<ApiTokenCreateWithoutEventsInput, ApiTokenUncheckedCreateWithoutEventsInput>
    where?: ApiTokenWhereInput
  }

  export type ApiTokenUpdateToOneWithWhereWithoutEventsInput = {
    where?: ApiTokenWhereInput
    data: XOR<ApiTokenUpdateWithoutEventsInput, ApiTokenUncheckedUpdateWithoutEventsInput>
  }

  export type ApiTokenUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
    project?: ProjectUpdateOneRequiredWithoutApiTokensNestedInput
    payments?: PaymentUpdateManyWithoutTokenNestedInput
  }

  export type ApiTokenUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
    payments?: PaymentUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type EventDeliveryUpsertWithWhereUniqueWithoutEventInput = {
    where: EventDeliveryWhereUniqueInput
    update: XOR<EventDeliveryUpdateWithoutEventInput, EventDeliveryUncheckedUpdateWithoutEventInput>
    create: XOR<EventDeliveryCreateWithoutEventInput, EventDeliveryUncheckedCreateWithoutEventInput>
  }

  export type EventDeliveryUpdateWithWhereUniqueWithoutEventInput = {
    where: EventDeliveryWhereUniqueInput
    data: XOR<EventDeliveryUpdateWithoutEventInput, EventDeliveryUncheckedUpdateWithoutEventInput>
  }

  export type EventDeliveryUpdateManyWithWhereWithoutEventInput = {
    where: EventDeliveryScalarWhereInput
    data: XOR<EventDeliveryUpdateManyMutationInput, EventDeliveryUncheckedUpdateManyWithoutEventInput>
  }

  export type PaymentCreateWithoutProductsInput = {
    id?: string
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    project: ProjectCreateNestedOneWithoutPaymentsInput
    token?: ApiTokenCreateNestedOneWithoutPaymentsInput
    events?: EventCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutProductsInput = {
    id?: string
    projectId: string
    tokenId?: string | null
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
    events?: EventUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutProductsInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutProductsInput, PaymentUncheckedCreateWithoutProductsInput>
  }

  export type PaymentUpsertWithoutProductsInput = {
    update: XOR<PaymentUpdateWithoutProductsInput, PaymentUncheckedUpdateWithoutProductsInput>
    create: XOR<PaymentCreateWithoutProductsInput, PaymentUncheckedCreateWithoutProductsInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutProductsInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutProductsInput, PaymentUncheckedUpdateWithoutProductsInput>
  }

  export type PaymentUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutPaymentsNestedInput
    token?: ApiTokenUpdateOneWithoutPaymentsNestedInput
    events?: EventUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    events?: EventUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type EventCreateWithoutDeliveriesInput = {
    id?: string
    type: $Enums.EventType
    sessionId?: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutEventsInput
    payment?: PaymentCreateNestedOneWithoutEventsInput
    token?: ApiTokenCreateNestedOneWithoutEventsInput
  }

  export type EventUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    projectId: string
    type: $Enums.EventType
    sessionId?: string
    paymentId?: string | null
    tokenId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
  }

  export type EventCreateOrConnectWithoutDeliveriesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutDeliveriesInput, EventUncheckedCreateWithoutDeliveriesInput>
  }

  export type WebhookEndpointCreateWithoutDeliveriesInput = {
    id?: string
    url: string
    description?: string | null
    secret: string
    status?: $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointCreateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutWebhookEndpointsInput
  }

  export type WebhookEndpointUncheckedCreateWithoutDeliveriesInput = {
    id?: string
    projectId: string
    url: string
    description?: string | null
    secret: string
    status?: $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointCreateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookEndpointCreateOrConnectWithoutDeliveriesInput = {
    where: WebhookEndpointWhereUniqueInput
    create: XOR<WebhookEndpointCreateWithoutDeliveriesInput, WebhookEndpointUncheckedCreateWithoutDeliveriesInput>
  }

  export type EventUpsertWithoutDeliveriesInput = {
    update: XOR<EventUpdateWithoutDeliveriesInput, EventUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<EventCreateWithoutDeliveriesInput, EventUncheckedCreateWithoutDeliveriesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutDeliveriesInput, EventUncheckedUpdateWithoutDeliveriesInput>
  }

  export type EventUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutEventsNestedInput
    payment?: PaymentUpdateOneWithoutEventsNestedInput
    token?: ApiTokenUpdateOneWithoutEventsNestedInput
  }

  export type EventUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUpsertWithoutDeliveriesInput = {
    update: XOR<WebhookEndpointUpdateWithoutDeliveriesInput, WebhookEndpointUncheckedUpdateWithoutDeliveriesInput>
    create: XOR<WebhookEndpointCreateWithoutDeliveriesInput, WebhookEndpointUncheckedCreateWithoutDeliveriesInput>
    where?: WebhookEndpointWhereInput
  }

  export type WebhookEndpointUpdateToOneWithWhereWithoutDeliveriesInput = {
    where?: WebhookEndpointWhereInput
    data: XOR<WebhookEndpointUpdateWithoutDeliveriesInput, WebhookEndpointUncheckedUpdateWithoutDeliveriesInput>
  }

  export type WebhookEndpointUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutWebhookEndpointsNestedInput
  }

  export type WebhookEndpointUncheckedUpdateWithoutDeliveriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiTokens?: ApiTokenUpdateManyWithoutProjectNestedInput
    payments?: PaymentUpdateManyWithoutProjectNestedInput
    events?: EventUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    apiTokens?: ApiTokenUncheckedUpdateManyWithoutProjectNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutProjectNestedInput
    events?: EventUncheckedUpdateManyWithoutProjectNestedInput
    webhookEndpoints?: WebhookEndpointUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiTokenCreateManyProjectInput = {
    id?: string
    tokenHash: string
    environment?: $Enums.TokenEnvironment
    allowedDomains?: ApiTokenCreateallowedDomainsInput | string[]
    lastUsedAt?: Date | string | null
    requestCount?: number
    createdAt?: Date | string
    revokedAt?: Date | string | null
    status?: $Enums.TokenStatus
  }

  export type PaymentCreateManyProjectInput = {
    id?: string
    tokenId?: string | null
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
  }

  export type EventCreateManyProjectInput = {
    id?: string
    type: $Enums.EventType
    sessionId?: string
    paymentId?: string | null
    tokenId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
  }

  export type WebhookEndpointCreateManyProjectInput = {
    id?: string
    url: string
    description?: string | null
    secret: string
    status?: $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointCreateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiTokenUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
    payments?: PaymentUpdateManyWithoutTokenNestedInput
    events?: EventUpdateManyWithoutTokenNestedInput
  }

  export type ApiTokenUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
    payments?: PaymentUncheckedUpdateManyWithoutTokenNestedInput
    events?: EventUncheckedUpdateManyWithoutTokenNestedInput
  }

  export type ApiTokenUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenHash?: StringFieldUpdateOperationsInput | string
    environment?: EnumTokenEnvironmentFieldUpdateOperationsInput | $Enums.TokenEnvironment
    allowedDomains?: ApiTokenUpdateallowedDomainsInput | string[]
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTokenStatusFieldUpdateOperationsInput | $Enums.TokenStatus
  }

  export type PaymentUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    token?: ApiTokenUpdateOneWithoutPaymentsNestedInput
    products?: ProductUpdateManyWithoutPaymentNestedInput
    events?: EventUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutPaymentNestedInput
    events?: EventUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: PaymentUpdateOneWithoutEventsNestedInput
    token?: ApiTokenUpdateOneWithoutEventsNestedInput
    deliveries?: EventDeliveryUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: EventDeliveryUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: EventDeliveryUpdateManyWithoutEndpointNestedInput
  }

  export type WebhookEndpointUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: EventDeliveryUncheckedUpdateManyWithoutEndpointNestedInput
  }

  export type WebhookEndpointUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    secret?: StringFieldUpdateOperationsInput | string
    status?: EnumWebhookEndpointStatusFieldUpdateOperationsInput | $Enums.WebhookEndpointStatus
    eventTypes?: WebhookEndpointUpdateeventTypesInput | $Enums.EventType[]
    lastTimeHit?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyTokenInput = {
    id?: string
    projectId: string
    amount: bigint | number
    currency: $Enums.AllowedCurrency
    recipientAddress: string
    txHash?: string | null
    blockNumber?: bigint | number | null
    status?: $Enums.PaymentStatus
    failureReason?: string | null
    monitoringStartedAt?: Date | string
    confirmedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    idempotencyKey?: string | null
  }

  export type EventCreateManyTokenInput = {
    id?: string
    projectId: string
    type: $Enums.EventType
    sessionId?: string
    paymentId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
  }

  export type PaymentUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutPaymentsNestedInput
    products?: ProductUpdateManyWithoutPaymentNestedInput
    events?: EventUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    products?: ProductUncheckedUpdateManyWithoutPaymentNestedInput
    events?: EventUncheckedUpdateManyWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateManyWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    amount?: BigIntFieldUpdateOperationsInput | bigint | number
    currency?: EnumAllowedCurrencyFieldUpdateOperationsInput | $Enums.AllowedCurrency
    recipientAddress?: StringFieldUpdateOperationsInput | string
    txHash?: NullableStringFieldUpdateOperationsInput | string | null
    blockNumber?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    monitoringStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutEventsNestedInput
    payment?: PaymentUpdateOneWithoutEventsNestedInput
    deliveries?: EventDeliveryUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: EventDeliveryUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDeliveryCreateManyEndpointInput = {
    id?: string
    eventId: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type EventDeliveryUpdateWithoutEndpointInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    event?: EventUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type EventDeliveryUncheckedUpdateWithoutEndpointInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventDeliveryUncheckedUpdateManyWithoutEndpointInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProductCreateManyPaymentInput = {
    id?: string
    name: string
    price: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EventCreateManyPaymentInput = {
    id?: string
    projectId: string
    type: $Enums.EventType
    sessionId?: string
    tokenId?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: Date | string
    createdAt?: Date | string
  }

  export type ProductUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    price?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutEventsNestedInput
    token?: ApiTokenUpdateOneWithoutEventsNestedInput
    deliveries?: EventDeliveryUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveries?: EventDeliveryUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    type?: EnumEventTypeFieldUpdateOperationsInput | $Enums.EventType
    sessionId?: StringFieldUpdateOperationsInput | string
    tokenId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    occurredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventDeliveryCreateManyEventInput = {
    id?: string
    endpointId: string
    attemptNumber?: number
    deliveryStatus?: $Enums.DeliveryStatus
    httpStatusCode?: number | null
    errorMessage?: string | null
    responseBody?: string | null
    createdAt?: Date | string
    deliveredAt?: Date | string | null
  }

  export type EventDeliveryUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endpoint?: WebhookEndpointUpdateOneRequiredWithoutDeliveriesNestedInput
  }

  export type EventDeliveryUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    endpointId?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type EventDeliveryUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    endpointId?: StringFieldUpdateOperationsInput | string
    attemptNumber?: IntFieldUpdateOperationsInput | number
    deliveryStatus?: EnumDeliveryStatusFieldUpdateOperationsInput | $Enums.DeliveryStatus
    httpStatusCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    responseBody?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}