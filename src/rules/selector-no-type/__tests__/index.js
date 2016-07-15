import {
  messages,
  ruleName,
} from ".."
import rules from "../../../rules"
import { testRule } from "../../../testUtils"

const rule = rules[ruleName]

testRule(rule, {
  ruleName,
  config: [true],
  skipBasicChecks: true,

  accept: [ {
    code: "",
  }, {
    code: "@import \"foo.css\";",
  }, {
    code: "#foo {}",
  }, {
    code: ".foo {}",
  }, {
    code: "[foo] {}",
  }, {
    code: ".foo { & {} }",
  }, {
    code: ".foo { &.bar {} }",
  }, {
    code: ".foo { &-bar {} }",
  }, {
    code: ".foo { &__bar {} }",
  }, {
    code: ".foo { [&] {} }",
  }, {
    code: ".foo { & [class*=bar] {} }",
  }, {
    code: ".foo { @nest & {} }",
  }, {
    code: ".foo:nth-child(3n + 1) {}",
  }, {
    code: ".foo:nth-child(n) {}",
  }, {
    code: ".foo:nth-child(odd) {}",
  }, {
    code: ".foo:nth-child(even) {}",
  }, {
    code: ".foo:nth-child(-n) {}",
  }, {
    code: ".foo { &:nth-child(3n + 1) {} }",
  }, {
    code: "@keyframes spin { 0% {} }",
  }, {
    code: "@keyframes spin { to {} from {} }",
  }, {
    code: "@include keyframes(identifier) { to, 50.0% {} 50.01% {} 100% {} }",
    description: "non-standard usage of keyframe selectors",
  }, {
    code: ":root { --custom-property-set: {} }",
  } ],

  reject: [ {
    code: "foo {}",
    message: messages.rejected,
    line: 1,
    column: 1,
  }, {
    code: ".bar > foo {}",
    message: messages.rejected,
    line: 1,
    column: 8,
  }, {
    code: "foo.bar {}",
    message: messages.rejected,
    line: 1,
    column: 1,
  }, {
    code: ".foo, .bar, foo.baz {}",
    message: messages.rejected,
    line: 1,
    column: 13,
  } ],
})

testRule(rule, {
  ruleName,
  config: [ true, { ignore: ["descendant"] } ],
  skipBasicChecks: true,

  accept: [ {
    code: ".foo div {}",
  }, {
    code: ".foo > div {}",
  }, {
    code: ".foo + div {}",
  }, {
    code: "#bar div.foo {}",
    description: "compounded and descendant",
  } ],

  reject: [ {
    code: "div {}",
    message: messages.rejected,
  }, {
    code: ".foo, div {}",
    message: messages.rejected,
  }, {
    code: "div.foo {}",
    message: messages.rejected,
  } ],
})

testRule(rule, {
  ruleName,
  config: [ true, { ignore: ["compounded"] } ],
  skipBasicChecks: true,

  accept: [ {
    code: "div.foo {}",
  }, {
    code: "div#foo {}",
  }, {
    code: "div[something] {}",
  }, {
    code: "#bar div.foo {}",
    description: "compounded and descendant",
  } ],

  reject: [ {
    code: "div {}",
    message: messages.rejected,
  }, {
    code: ".foo, div {}",
    message: messages.rejected,
  }, {
    code: ".foo div {}",
    message: messages.rejected,
  } ],
})

testRule(rule, {
  ruleName,
  config: [ true, { ignore: [ "compounded", "descendant" ] } ],
  skipBasicChecks: true,

  accept: [{
    code: "#bar div.foo {}",
    description: "compounded and descendant",
  }],
})

testRule(rule, {
  ruleName,
  config: [true],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [
    { code: "// Comment\n.c {}" },
  ],

  reject: [{
    code: ".foo { div {} }",
    description: "nested descendant",
    message: messages.rejected,
  }],
})

testRule(rule, {
  ruleName,
  config: [ true, { ignore: ["descendant"] } ],
  skipBasicChecks: true,
  syntax: "scss",

  accept: [{
    code: ".foo { div {} }",
    description: "nested descendant",
  }],
})

testRule(rule, {
  ruleName,
  config: [true],
  skipBasicChecks: true,
  syntax: "less",

  accept: [
    { code: "// Comment\n.c {}" },
  ],

  reject: [{
    code: ".foo { div {} }",
    description: "nested descendant",
    message: messages.rejected,
  }],
})

testRule(rule, {
  ruleName,
  config: [ true, { ignore: ["descendant"] } ],
  skipBasicChecks: true,
  syntax: "less",

  accept: [{
    code: ".foo { div {} }",
    description: "nested descendant",
  }],
})
