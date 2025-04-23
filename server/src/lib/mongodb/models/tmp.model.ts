import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class Tmp extends TimeStamps  {
    @prop({ type: () => String, required: true, unique: true })
    public name: string;
}

export const QuizModel = getModelForClass(Tmp);
export type QuizDocument = DocumentType<Tmp>;
