interface Shape_Visitor {
    move(x: number, y: number): void;
    draw(): void;
    accept(visitor: Visitor_V1): void;
}

class Dot implements Shape_Visitor{
    move(x: number, y: number): void {
        console.log('Dot has been moved x: ' + x + ' y: ' + y);
    }
    draw(): void {
        console.log('Dot has been drawn');
    }

    xmlExportDot(): string {
        return '<dot>' + '</dot>';
    }
    accept(visitor: Visitor_V1): void {
       visitor.visitDot(this);
    }

}

class Circle_Figure implements Shape_Visitor{
    move(x: number, y: number): void {
        console.log('Circle has been moved x: ' + x + ' y: ' + y);
    }
    draw(): void {
        console.log('Circle has been drawn');
    }
    accept(visitor: Visitor_V1): void {
        visitor.visitCircle(this);
    }
    xmlExportCircle(): string {
        return '<circle>' + '</circle>';
    }
   
}

class Rectangule implements Shape_Visitor{
    move(x: number, y: number): void {
        console.log('Rectangule has been moved x: ' + x + ' y: ' + y);
    }
    draw(): void {
       console.log('Rectangule has been drawn');
    }
    accept(visitor: Visitor_V1): void {
        visitor.visitRectangule(this);
    }  
    xmlExportRectangule(): string {
        return '<rectangule>' + '</rectangule>';
    }
}

class CompoundShape implements Shape_Visitor{
    move(x: number, y: number): void {
        console.log('CompooundShape has been moved x: ' + x + ' y: ' + y);
    }
    draw(): void {
        console.log('CompoundShape has been drawn');
    }
    accept(visitor: Visitor_V1): void {
       visitor.visitCompoundShape(this);
    }
    xmlExportCompoundShape(): string {
        return '<compoundShape>' + '</compoundShape>';
    }    
}


interface Visitor_V1{
    visitDot(element: Dot): void;
    visitCircle(element: Circle_Figure): void;
    visitRectangule(element: Rectangule): void;
    visitCompoundShape(element: CompoundShape): void;
}

class XMLExportVisitor implements Visitor_V1{
    visitDot(element: Dot): void {
        console.log(`${element.xmlExportDot()} + XMLExportVisitor`);
    }
    visitCircle(element: Circle_Figure): void {
        console.log(`${element.xmlExportCircle()} + XMLExportVisitor`);
    }
    visitRectangule(element: Rectangule): void {
        console.log(`${element.xmlExportRectangule()} + XMLExportVisitor`);
    }
    visitCompoundShape(element: CompoundShape): void {
        console.log(`${element.xmlExportCompoundShape()} + XMLExportVisitor`);
    }

}

// CLASES CONCRETAS
const dot = new Dot();
const circle = new Circle_Figure();


/// VISITOR
const XML_Export = new XMLExportVisitor();


// las clases concretas llaman al visitor para que haga su trabajo
circle.accept(XML_Export);

dot.accept(XML_Export);