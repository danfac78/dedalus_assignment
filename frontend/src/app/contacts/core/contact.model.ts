export interface IContact {
    firstname: string;
    lastname: string;
    telephone: string;
    email: string;
    address: string;
}

export class Contact implements IContact {
    public get firstname(): string { return this.c.firstname; }
    public get lastname(): string { return this.c.lastname; }
    public get telephone(): string { return this.c.telephone; }
    public get email(): string { return this.c.email; }
    public get address(): string { return this.c.address; }

    private readonly c: IContact;

    constructor(contact: IContact){
        this.c = { ...contact };
    }

    toString = () => JSON.stringify(this.c);
}

export type Contacts = Contact[];
