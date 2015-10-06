
// move: {
// 	action: 'move',
// 	direction: (enum)['up', 'down', 'left', 'right'],
// 	distance: Number
// }

// pickUp:{
// 	action: 'pickUp',
// 	variable: Object (ref to collectable)
// }

// putDown:{
// 	action: 'putDown',
// 	variable: Object (ref to collectable)
// }

// ifStatement: {
// 	action: 'ifStatement',
// 	condition: scope var (true or false),
// 	expression: another spell component,
// 	elseExpr: (opt) another spell component
// }

// whileLoop:{
// 	action: 'whileLoop',
// 	condition: scope var (true or false),
// 	expression: another spell component
// }

// forLoop: {
// 	action: 'whileLoop',
// 	number: Number,
// 	expression: another spell component
// }

// ask: {
// 	person: scope var,
// 	question: scope var
// }

// tell: {
// 	person: scope var,
// 	answer: scope var
// }