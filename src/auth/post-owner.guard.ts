import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}

  private async checkAuthor(postUserId: number, userId: number) {
    if (postUserId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to perform this action',
      );
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const user = request.user;
    const postId = +request.params.id;

    const post = await this.postsService.findOne(postId);
    if (!post) {
      throw new ForbiddenException('Post not found');
    }

    if (method === 'DELETE') {
      if (user.role !== 'admin') this.checkAuthor(post.userId, user.userId);
    } else {
      this.checkAuthor(post.userId, user.userId);
    }

    return true;
  }
}
