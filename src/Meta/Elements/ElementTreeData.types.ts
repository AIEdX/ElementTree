import { Component } from "Meta/Components/Component.type";

export type ElementTypes =
 | "fragment"
 | "div"
 | "span"
 | "pre"
 | "code"
 | "embed"
 | "object"
 | "param"
 | "picture"
 | "source"
 | "audio"
 | "video"
 | "track"
 | "img"
 | "svg"
 | "ul"
 | "ol"
 | "li"
 | "nav"
 | "article"
 | "aside"
 | "section"
 | "header"
 | "footer"
 | "form"
 | "input"
 | "label"
 | "textarea"
 | "select"
 | "option"
 | "optiongroup"
 | "datalist"
 | "button"
 | "a"
 | "canvas"
 | "iframe"
 | "table"
 | "th"
 | "thead"
 | "tbody"
 | "colgroup"
 | "tr"
 | "td"
 | "component"
 | "text"
 | "p"
 | "h1"
 | "h2"
 | "h3"
 | "h4"
 | "h5"
 | "h6";

export type HTMLInputTypes =
 | "button"
 | "checkbox"
 | "color"
 | "date"
 | "datetime-local"
 | "email"
 | "file"
 | "hidden"
 | "image"
 | "month"
 | "number"
 | "password"
 | "radio"
 | "range"
 | "reset"
 | "search"
 | "submit"
 | "tel"
 | "text"
 | "time"
 | "url"
 | "week";

export type ElementAttributes = {
 id?: string;
 className?: string;
 cssText?: string;
 target?: string;
 dataSet?: Record<string, string>;
 forms?: {
  action?: string;
  method?: string;
  novalidate?: boolean;
  autocomplete?: boolean;
  acceptCharset?: string;
  enctype?: string;
 };
 inputs?: {
  name?: string;
  required?: boolean;
  checked?: boolean;
  type?: HTMLInputTypes;
  value?: string | number;
 };
 aria?: {
  //widget
  autocomplete?: boolean;
  checked?: boolean;
  disabled?: boolean;
  errormessage?: string;
  expanded?: boolean;
  haspopup?: boolean;
  hidden?: boolean;
  invalid?: "spelling" | "grammar" | "false" | "true";
  label?: string;
  modal?: boolean;
  multiline?: boolean;
  multiselecttable?: boolean;
  orientation?: boolean;
  placeholder?: string;
  pressed?: boolean;
  readyonly?: boolean;
  required?: boolean;
  selected?: boolean;
  sorted?: "ascending" | "descending" | "none" | "other";
  valuemax?: number;
  valuenow?: number;
  valuemin?: number;
  valuetext?: string;
  //live region
  busy?: boolean;
  live?: "assertive" | "polite" | "off";
  relevant?: "additions" | "all" | "text" | "additions text";
  atomic?: boolean;
  //drag n drop
  dropeffect?: "copy" | "execute" | "link" | "move" | "none" | "popup";
  grabbed?: "true" | "false" | "undefined";
  //reltionship
  activedescendant?: string;
  colcount?: number;
  colindex?: number;
  colspan?: number;
  controls?: string;
  describedby?: string;
  description?: string;
  details?: string;
  flowto?: string;
  labelledby?: string;
  owns?: string;
  posinset?: number;
  rowcount?: number;
  rowindex?: number;
  rowspan?: number;
  setsize?: number;
  roledescription?: string;
  keyshortcuts?: string;
 };
};
export type ElementAttributeList = keyof ElementAttributes;

export type ElementEvents =
 | "onInput"
 | "onReset"
 | "onSearch"
 | "onChange"
 | "onClick"
 | "onDoubleClick"
 | "onContextMenu"
 | "onKeyDown"
 | "onKeyUp"
 | "onKeyPress"
 | "onTouchStart"
 | "onTouchEnd"
 | "onTouchMove"
 | "onTouchStart"
 | "onWheel"
 | "onMouseUp"
 | "onMouseDown"
 | "onMouseOver"
 | "onMouseOver"
 | "onMouseEnter"
 | "onMouseMove"
 | "onMouseLeave"
 | "onFocus"
 | "onFocusIn"
 | "onFocusOut"
 | "onBlur"
 | "onSelect"
 | "onCopy"
 | "onCut"
 | "onPaste"
 | "onDrag"
 | "onDragEnd"
 | "onDragStart"
 | "onDrop";

export type InputValueTypes = "string" | "number" | "boolean";

export type ElementTreeObject = {
 type: ElementTypes;
 component?: {
  func: Component<any>;
  stateProps: any;
  stateObject: Readonly<any>;
 };
 cascade?: {
  origin: any;
  receiver: (elm: any, cascadeProps: any) => void;
 };
 bindInput?: {
  bindTo: any;
  objectPropertyName: string;
  valueType: InputValueTypes;
 };
 toRef?: {
  refObj: any;
  refObjProperty: string;
 };
 attrs?: ElementAttributes;
 events?: { [K in ElementEvents]?: Function };
 text?: string;
 children?: ElementTreeData;
};

type Elements = ElementTreeObject | ElementTreeObject[] | ElementTreeData;
export type ElementTreeData = Elements[];
