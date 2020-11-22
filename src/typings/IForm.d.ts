export interface IFormRule {
  type: RuleType
  message: string
}

export type RuleType = 'required' | 'email' | 'number' | 'integer'