function newTextInput() {
  let txtInput = document.createElement("input");
  txtInput.type = "text";
  txtInput.onchange = newTextInput;
  txtInput.placeholder = "Type Param";
  document.getElementById("inputs").appendChild(document.createElement("br"));
  document.getElementById("inputs").appendChild(txtInput);
  let children = document.getElementById("inputs").children;
  children[children.length-1].focus()
}

function submit() {
  let children = document.getElementById("inputs").children;
  console.log(children);

  let array = [];

  for (let i = 0; i < children.length; i++) {

    if (children[i].localName == "input") {
      let value = children[i].value;
      if (value != "") {
        array.push(value)
      }
    }

    if (i == children.length-1) {
      console.log(array);
      let className = document.getElementById("classNameInput").value;
      let isPublic = false;

      if (document.getElementById("isPublic").checked == true) {
        isPublic = true;
      }

      doStuff(className, array, isPublic)
    }
  }
}

function doStuff(className, inputFields, isPublic) {

  let declaration = [];
  let constructor = [];
  let getters = [];
  let setters = [];

  constructor.push('    ' + (isPublic ? 'public ' : '') + className + '(' + inputFields.join(', ') + ') {');

  inputFields.forEach(function (input) {

    let split = input.split(' ');

    let type  = split[0];
    let param = split[1];
    let Param = capitalizeFirstLetter(param);

    // create declaration
    declaration.push('    private ' + input + ';');

    // create constructor
    constructor.push('        this.' + param + ' = ' + param + ';');

    // create getters
    let getter = '';
    getter += '    ' + (isPublic ? 'public ' : '') + type + ' ' + ((type == 'boolean' || type == 'Boolean') ? 'is' : 'get') + Param + '() {\n';
    getter += '        return ' + param + ';\n';
    getter += '    }';
    getters.push(getter);

    // create setters
    let setter = '';
    setter += '    ' + (isPublic ? 'public ' : '') + 'void set' + Param + '(' + input + ') {\n';
    setter += '        this.' + param + ' = ' + param + ';\n';
    setter += '    }';
    setters.push(setter);

  });

  constructor.push('    }');

  let output = '';
  output += 'class ' + className + ' {';
  output += '\n\n';
  output += declaration.join('\n');
  output += '\n\n';
  output += constructor.join('\n');
  output += '\n\n';
  output += '    // Getters \n\n';
  output += getters.join('\n\n');
  output += '\n\n';
  output += '    // Setters \n\n';
  output += setters.join('\n\n');
  output += '\n\n';
  output += '}';

  console.log(output);
  document.getElementById("output").innerHTML = output;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let className = 'PickPackObjectBarcode';
let inputFields = ['long productPackId', 'int packSize', 'String barcode', 'boolean success'];

doStuff(className, inputFields, false);
