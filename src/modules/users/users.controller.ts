import { Controller, Get, Patch, Body, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const user = await this.usersService.user({
      where: { id: req.user.userId || req.user.sub },
      include: {
        attendances: {
          include: {
            event: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId || req.user.sub;
    
    // Note: If updating password, it should be hashed in the service, 
    // but for simplicity we pass it to the service down below.
    const user = await this.usersService.updateUser({
      where: { id: userId },
      data: updateUserDto,
    });
    
    const { password, ...result } = user;
    return result;
  }
}
