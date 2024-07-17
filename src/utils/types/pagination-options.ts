export interface IPaginationFieldConfig {
    joinTable: any;
    alias: () => string;
    selectFields: (alias: string) => string[];
}
