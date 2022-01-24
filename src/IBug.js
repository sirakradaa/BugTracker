export var BugPriority;
(function (BugPriority) {
    BugPriority["LOW"] = "Low";
    BugPriority["MEDIUM"] = "Medium";
    BugPriority["HIGH"] = "High";
})(BugPriority || (BugPriority = {}));

export interface IBug {
    id: string;
    description: string;
    priority: BugPriority;
}