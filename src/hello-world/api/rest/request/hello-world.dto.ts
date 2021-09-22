import { IsNotEmpty, IsString } from 'class-validator';

export class HelloWorldRequestDTO {
  @IsString()
  @IsNotEmpty()
  helloWorld: string;
}
