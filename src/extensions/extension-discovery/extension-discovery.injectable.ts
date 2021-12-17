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
import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import { ExtensionDiscovery } from "./extension-discovery";
import extensionLoaderInjectable from "../extension-loader/extension-loader.injectable";
import extensionInstallerInjectable from "../extension-installer/extension-installer.injectable";
import isCompatibleExtensionInjectable from "./is-compatible-extension/is-compatible-extension.injectable";
import isCompatibleBundledExtensionInjectable from "./is-compatible-bundled-extension/is-compatible-bundled-extension.injectable";
import extensionsStoreInjectable from "../extensions-store/extensions-store.injectable";
import extensionInstallationStateStoreInjectable from "../extension-installation-state-store/extension-installation-state-store.injectable";
import extensionPackagesRootInjectable
  from "../extension-packages-root/extension-packages-root.injectable";

const extensionDiscoveryInjectable = getInjectable({
  instantiate: async (di) =>
    new ExtensionDiscovery({
      extensionLoader: di.inject(extensionLoaderInjectable),

      extensionInstaller: await di.inject(extensionInstallerInjectable),

      extensionsStore: di.inject(extensionsStoreInjectable),

      extensionInstallationStateStore: di.inject(
        extensionInstallationStateStoreInjectable,
      ),

      isCompatibleBundledExtension: di.inject(
        isCompatibleBundledExtensionInjectable,
      ),

      isCompatibleExtension: di.inject(isCompatibleExtensionInjectable),

      extensionPackagesRoot: await di.inject(extensionPackagesRootInjectable),
    }),

  lifecycle: lifecycleEnum.singleton,
});

export default extensionDiscoveryInjectable;
