import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Slug } from './value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { QuestionAttachment } from './question-attachment'

export interface QuestionProps {
  title: string
  bestAnswerId?: UniqueEntityID
  content: string
  slug: Slug
  authorId: UniqueEntityID
  attachments: QuestionAttachment[]
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get except() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }
}
