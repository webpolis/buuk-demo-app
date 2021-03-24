export class Test {
    public title: string;
    public questions?: Question[];
}

export class Question {
    content: string;
    multiple: boolean;
    choices?: Choice[];
}

export class Choice {
    content: string;
}
