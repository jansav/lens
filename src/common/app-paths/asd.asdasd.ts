/**
 * Copyright (c) 2021 OpenLens Authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {
  getInjectable,
  getInjectionToken,
  lifecycleEnum,
} from "@ogre-tools/injectable";

export type Asd = (props: { mikko: string }) => Promise<number>;

interface InstantiationParameter {
  someInstantiationParameter: number;
}

export const syncInjectionToken = getInjectionToken<
  Asd,
  InstantiationParameter
>();

export const asyncInjectionToken = getInjectionToken<
  Promise<Asd>,
  InstantiationParameter
>();

interface MikkoForParams {
  someDependency: string;
  someInstantiationParameter: number;
}

const mikkoFor =
  ({ someDependency, someInstantiationParameter }: MikkoForParams) =>
    ({ mikko }: { mikko: string }) =>
      Promise.resolve(84);

// SYNC, INJECTION TOKEN
// {
//   async: false;
//   instantiation: false;
//   injectionToken: true;
// }
export const syncInjectableWithToken = getInjectable({
  instantiate: (di, instantiationParameter) =>
    mikkoFor({
      someDependency: "asd",
      someInstantiationParameter:
        instantiationParameter.someInstantiationParameter,
    }),

  injectionToken: syncInjectionToken,
  lifecycle: lifecycleEnum.singleton,
});

// ASYNC, INJECTION TOKEN
export const asyncInjectableWithToken = getInjectable({
  instantiate: async (di, instantiationParameter) =>
    mikkoFor({
      someDependency: await Promise.resolve("asd"),
      someInstantiationParameter:
        instantiationParameter.someInstantiationParameter,
    }),

  injectionToken: asyncInjectionToken,
  lifecycle: lifecycleEnum.singleton,
});

// SYNC
export const syncInjectable = getInjectable({
  instantiate: (di, instantiationParameter: InstantiationParameter) =>
    mikkoFor({
      someDependency: "asd",
      someInstantiationParameter:
        instantiationParameter.someInstantiationParameter,
    }),

  lifecycle: lifecycleEnum.singleton,
});

// ASYNC
export const asyncInjectable = getInjectable({
  instantiate: async (di, instantiationParameter: InstantiationParameter) =>
    mikkoFor({
      someDependency: await Promise.resolve("asd"),
      someInstantiationParameter:
        instantiationParameter.someInstantiationParameter,
    }),

  lifecycle: lifecycleEnum.singleton,
});

console.log(syncInjectableWithToken, asyncInjectableWithToken, asyncInjectable);

// (async () => {
//   const di = getDi();
//
//   const blaa1 = di.inject(appPathsInjectionToken, {
//     someInstantiationParameter: 42,
//   });
//
//   const blaa4 = di.inject(janne2Injectable, {
//     someInstantiationParameter: 42,
//   });
//
//   const blaa2 = di.injectAsync(asyncInjectable, {
//     someInstantiationParameter: 42,
//   });
//
//   const blaa3 = di.injectAsync(appPathsInjectionToken, {
//     someInstantiationParameter: 42,
//   });
//
//   di.purge(appPathsInjectionToken);
//
//   di.purge(janne2Injectable);
//
//   di.override(asyncInjectable,  (arg) => "asd");
//   di.override(asyncInjectable,  (arg) => 42);
//
//
//   const asd = jest.fn();
//
//   di.override(asyncInjectable,  (arg) => 42);
//
//   di.override(syncInjectable, (arg) => "42");
//   di.override(syncInjectable, (arg) => 42);
//
//   di.override(mikko2Injectable, (arg) => "42");
//   di.override(mikko2Injectable, (arg) => 42);
//
//   di.override(janne2Injectable, (arg) => "42");
//   di.override(janne2Injectable, (arg) => 42);
//
//
//
//   // di.override(janne2Injectable, ({ mikko }) => 42);
//
//
//
//   // const blaa3 = di.inject(appPathsInjectionToken);
//   // const blaa4 = di.inject(asyncInjectable);
//   //
//   // const blaa5: string = di.inject(appPathsInjectionToken);
//   // const blaa6: string = di.inject(asyncInjectable);
//   //
//   // const blaa7: Asd = await di.injectAsync(appPathsInjectionToken);
//   // const blaa8: Asd = await di.injectAsync(asyncInjectable);
//   //
//   // const blaa9 = await di.injectAsync(appPathsInjectionToken);
//   // const blaa10 = await di.injectAsync(asyncInjectable);
//   //
//   // const blaa11: string = await di.injectAsync(appPathsInjectionToken);
//   // const blaa12: string = await di.injectAsync(asyncInjectable);
//
//   console.log(
//     blaa1,
//     blaa2,
//     blaa3,
//     blaa4,
//     // blaa5,
//     // blaa6,
//     // blaa7,
//     // blaa8,
//     // blaa9,
//     // blaa10,
//     // blaa11,
//     // blaa12,
//   );
// })();
