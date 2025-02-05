interface Button_AF{
    paint(): string;
}

interface CheckBox_AF{
    paint(): string;
}


class WinButton implements Button_AF{
    paint(){
        return "WinButton";
    }
}

class WinCheckBox implements CheckBox_AF{
    paint(){
        return "WinCheckBox";
    }
}

class MacButton implements Button_AF{
    paint(){
        return "MacButton";
    }
}

class MacCheckBox implements CheckBox_AF{
    paint(){
        return "MacCheckBox";
    }
}

interface GUIFactory{
    createButton(): Button_AF;
    createCheckBox(): CheckBox_AF;
}


class  WinFactory implements GUIFactory{
    createButton():Button_AF{
        return new WinButton();
    }
    createCheckBox():CheckBox_AF{
        return new WinCheckBox();
    }
}

class MacFactory implements GUIFactory{
    createButton():Button_AF{
        return new MacButton();
    }
    createCheckBox():CheckBox_AF{
        return new MacCheckBox();
    }
}

class Application {
    private factory: GUIFactory;
    private button: Button_AF;

    constructor(factory: GUIFactory){
        this.factory = factory;
        this.button = this.factory.createButton();
    }

    createUI(){
        this.button = this.factory.createButton();
    }
    paint(){
        console.log(this.button.paint());
    }
}

// Ejemplo de uso

const app1 = new Application( new WinFactory());
console.log('Llamado al factory con WinFactory');
app1.createUI();
app1.paint(); // Output: Render a button in a Windows style
console.log('');
const app2 = new Application( new MacFactory());
console.log('Llamado al factory con MacFactory');
app2.createUI();
app2.paint(); // Output: Render a button in a Mac style