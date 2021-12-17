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
import { getDiForUnitTesting as getMainDi } from "../../main/getDiForUnitTesting";
import { getDiForUnitTesting as getRendererDi } from "../../renderer/components/getDiForUnitTesting";
import type { ConfigurableDependencyInjectionContainer } from "@ogre-tools/injectable";
import { appPathsInjectionToken } from "./app-path-injection-token";
import ipcMainInjectable from "../../main/app-paths/register-channel/ipc-main/ipc-main.injectable";
import getElectronAppPathInjectable from "../../main/app-paths/get-electron-app-path/get-electron-app-path.injectable";
import ipcRendererInjectable
  from "../../renderer/components/app-paths/get-registered-channel/ipc-renderer/ipc-renderer.injectable";

describe("app-paths", () => {
  let mainDi: ConfigurableDependencyInjectionContainer;
  let rendererDi: ConfigurableDependencyInjectionContainer;

  beforeEach(() => {
    rendererDi = getRendererDi();
    mainDi = getMainDi();

    mainDi.override(
      getElectronAppPathInjectable,
      () => (key: string): string | undefined => ({ home: "some-home-path" }[key]),
    );

    overrideIpcBridge({ rendererDi, mainDi });

    rendererDi.runSetups();
    mainDi.runSetups();
  });

  describe("given in renderer", () => {
    it("when injecting app paths", async () => {
      const actual = await rendererDi.inject(appPathsInjectionToken);

      expect(actual).toEqual({
        home: "some-home-path",
      });
    });
  });

  describe("given in main", () => {
    it("when injecting home directory path", async () => {
      const actual = await mainDi.inject(appPathsInjectionToken);

      expect(actual).toEqual({
        home: "some-home-path",
      });
    });
  });
});

const overrideIpcBridge = ({
  rendererDi,
  mainDi,
}: {
  rendererDi: ConfigurableDependencyInjectionContainer;
  mainDi: ConfigurableDependencyInjectionContainer;
}) => {
  const mainIpcHandles = new Map<string, Function>();

  
  // @ts-ignore
  rendererDi.override(ipcRendererInjectable, () => ({
    invoke: (channel: string) => {
      const callback = mainIpcHandles.get(channel);

      if (callback) {
        return callback();
      }
    },
  }));

  // @ts-ignore
  mainDi.override(ipcMainInjectable, () => ({
    handle: (channel: string, listener: (...args: any[]) => any) =>
      mainIpcHandles.set(channel, listener),
  }));
};
