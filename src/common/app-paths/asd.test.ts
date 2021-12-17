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
import asyncFn, { AsyncFnMock } from "@async-fn/jest";
import { getDi } from "../../main/getDi";
import {
  syncInjectionToken,
  Asd,
  asyncInjectable,
  syncInjectable, syncInjectableWithToken, asyncInjectionToken,
} from "./asd.injectable";

describe("asd", () => {
  let someMock: jest.MockedFunction<Asd>;
  let someOtherMock: AsyncFnMock<Asd>;

  it("", async () => {
    const di = getDi();

    const blaa1 = di.inject(syncInjectionToken, {
      someInstantiationParameter: 42,
    });

    const blaa6 = di.inject(syncInjectable, {
      someInstantiationParameter: 42,
    });

    const blaa2 = await di.inject(asyncInjectable, {
      someInstantiationParameter: 42,
    });

    const blaa3 = await di.inject(asyncInjectionToken, {
      someInstantiationParameter: 42,
    });

    const blaa4 = di.inject(asyncInjectable, {
      someInstantiationParameter: 42,
    });

    const blaa5 = di.inject(asyncInjectionToken, {
      someInstantiationParameter: 42,
    });

    // di.purge(appPathsInjectionToken);

    di.purge(syncInjectable);
    

    someMock = jest.fn((arg0) => Promise.resolve(42));

    someOtherMock = asyncFn();

    di.override(asyncInjectable, () => Promise.resolve(() => Promise.resolve(42)) );
    di.override(asyncInjectable, () => Promise.resolve(someMock));
    di.override(asyncInjectable, () => Promise.resolve(someOtherMock));

    di.override(syncInjectable, () => (arg) => Promise.resolve(42));
    di.override(syncInjectable, () => someMock);
    di.override(syncInjectable, () => someOtherMock);

    // di.override(asyncInjectable, true);
    // di.override(asyncInjectable,  42);

    // di.override(janne2Injectable, (arg) => "42");
    // di.override(janne2Injectable, (arg) => 42);
    di.override(syncInjectableWithToken, () => (arg) => Promise.resolve(42));
    di.override(syncInjectableWithToken, () => someMock);

    // di.override(syncInjectable, (arg) => "42");

    // di.override(janne2Injectable, ({ mikko }) => 42);

    // const blaa3 = di.inject(appPathsInjectionToken);
    // const blaa4 = di.inject(asyncInjectable);
    //
    // const blaa5: string = di.inject(appPathsInjectionToken);
    // const blaa6: string = di.inject(asyncInjectable);
    //
    // const blaa7: Asd = await di.injectAsync(appPathsInjectionToken);
    // const blaa8: Asd = await di.injectAsync(asyncInjectable);
    //
    // const blaa9 = await di.injectAsync(appPathsInjectionToken);
    // const blaa10 = await di.injectAsync(asyncInjectable);
    //
    // const blaa11: string = await di.injectAsync(appPathsInjectionToken);
    // const blaa12: string = await di.injectAsync(asyncInjectable);

    console.log(
      blaa1,
      blaa2,
      blaa3,
      blaa4,
      blaa5,
      blaa6,
      // blaa7,
      // blaa8,
      // blaa9,
      // blaa10,
      // blaa11,
      // blaa12,
    );
  });
});
