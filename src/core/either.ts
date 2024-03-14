// Error
export class Left<L> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }
}

// Success
export class Rigth<R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }
}

export type Either<L, R> = Left<L> | Rigth<R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const rigth = <L, R>(value: R): Either<L, R> => {
  return new Rigth(value)
}
