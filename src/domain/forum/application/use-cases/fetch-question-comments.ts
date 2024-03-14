import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCaseCase {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseCaseRequest): Promise<FetchQuestionCommentsUseCaseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}
