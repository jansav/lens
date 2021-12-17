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
import type { AppPaths } from "./app-path-injection-token";
import { appPathsInjectionToken } from "./app-path-injection-token";
import { createChannel } from "../ipc-channel/create-channel/create-channel";

import { getInjectable, lifecycleEnum } from "@ogre-tools/injectable";
import { registerChannelInjectionToken } from "../ipc-channel/register-channel-injection-token";
import { getRegisteredChannelInjectionToken } from "../ipc-channel/get-registered-channel-injection-token";

const appPathsIpcChannel = createChannel<AppPaths>("app-paths");

const appPathsIpcChannelInjectable = getInjectable({
  setup: async (di) => {
    const registerChannel = di.inject(registerChannelInjectionToken);

    registerChannel(appPathsIpcChannel, () =>
      di.inject(appPathsInjectionToken),
    );
  },

  instantiate: (di) => {
    const getRegisteredChannel = di.inject(getRegisteredChannelInjectionToken);

    return getRegisteredChannel(appPathsIpcChannel);
  },

  lifecycle: lifecycleEnum.singleton,
});

export default appPathsIpcChannelInjectable;
