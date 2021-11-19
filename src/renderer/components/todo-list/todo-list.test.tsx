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
import type { ConfigurableDependencyInjectionContainer } from "@ogre-tools/injectable";
import { DiContextProvider, Inject } from "@ogre-tools/injectable-react";
import { render } from "@testing-library/react";
import React from "react";
import { getDiForUnitTesting } from "../getDiForUnitTesting";
import TodoListInjectable from "./todo-list.injectable";
import storedTodoListItemsInjectable
  from "./todo-list-model/stored-todo-list-items/stored-todo-list-items.injectable";

describe("TodoList", () => {
  let di: ConfigurableDependencyInjectionContainer;
  let container: HTMLElement;

  beforeEach(async () => {
    di = getDiForUnitTesting();

    di.override(
      storedTodoListItemsInjectable,

      [
        { id: "some-id", title: "Some item title" },
        { id: "some-other-id", title: "Some other item title" },
        { id: "some-another-id", title: "Some another item title" },
      ],
    );

    ({ container } = render(
      <DiContextProvider value={{ di }}>
        <Inject injectableKey={TodoListInjectable} />
      </DiContextProvider>,
    ));
  });

  it("renders", () => {
    expect(container).toMatchSnapshot();
  });
});
