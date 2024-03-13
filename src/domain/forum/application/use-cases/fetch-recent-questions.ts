import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/question-repository'

interface FetchRecentQuestionsCaseRequest {
  page: number
}

interface FetchRecentQuestionsCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsCaseRequest): Promise<FetchRecentQuestionsCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({
      page,
    })

    return {
      questions,
    }
  }
}
