import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Any } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";

@Controller("/produtos")
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.findOneById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  post(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  put(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }

  @Get('/nome/:nome/elaboratorio/:laboratorio')
  @HttpCode(HttpStatus.OK)
  findByNomeAndLaboratorio(@Param('nome') nome: string, @Param('laboratorio') laboratorio: string): Promise<Produto[]> {
    return this.produtoService.findByNomeAndLaboratorio(nome, laboratorio);
  }

  @Get('/nome/:nome/oulaboratorio/:laboratorio')
  @HttpCode(HttpStatus.OK)
  findByNomeOrLaboratorio(@Param('nome') nome: string, @Param('laboratorio') laboratorio: string): Promise<Produto[]> {
    return this.produtoService.findByNomeOrLaboratorio(nome, laboratorio);
  }

  @Get('/preco_inicial/:inicio/preco_final/:fim')
  @HttpCode(HttpStatus.OK)
  findByPrecoBetween(@Param('inicio') inicio: number, @Param('fim') fim: number): Promise<Produto[]> {
    return this.produtoService.findByPrecoBetween(inicio, fim);
  }

  @Get('/lista_preco/:p1/:p2/:p3')
  @HttpCode(HttpStatus.OK)
  findByPrecoIn(@Param('p1') p1: number, @Param('p2') p2: number, @Param('p3') p3: number): Promise<Produto[]> {
    let preco: number[] = [p1, p2, p3]
    return this.produtoService.findByPrecoIn(preco);
  }

}
