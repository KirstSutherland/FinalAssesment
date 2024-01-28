import { Int32 } from "mongodb";
import { subject } from "./subject.model";

export interface student {
    studentID: String;
    firstName: String;
    lastName: String;
    subjects: subject;
}