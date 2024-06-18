import { Injectable } from '@nestjs/common';
import { QueryRunner, EntityManager } from 'typeorm';
import { Observable, defer, from, map } from 'rxjs';

@Injectable()
export class TransactionService {
  private queryRunner: QueryRunner;

  constructor(private manager: EntityManager) {}

  startTransactionByQueryRunner(): Observable<QueryRunner> {
    const queryRunner = this.manager.connection.createQueryRunner();
    queryRunner.connect();
    return defer(() => queryRunner.startTransaction()).pipe(
      map(() => {
        return queryRunner;
      }),
    );
  }

  commitTransactionByQueryRunner(queryRunner: QueryRunner): Observable<any> {
    return from(queryRunner.commitTransaction()).pipe(map(() => true));
  }

  rollbackTransactionByQueryRunner(queryRunner: QueryRunner): Observable<any> {
    return from(queryRunner.rollbackTransaction()).pipe(map(() => true));
  }

  releaseByQueryRunner(queryRunner: QueryRunner): Observable<any> {
    return from(queryRunner.release()).pipe(map(() => true));
  }
}
