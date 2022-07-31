import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, DeleteResult, In, LessThan, Like, MoreThan, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find(
            {
                relations:{
                    categoria: true
                }
            }
        );
    }

    async findOneById(id: number): Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                categoria: true
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
            
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: Like(`%${nome}%`)
            },
            relations: {
                categoria: true
            }
        })
    }

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        
        let buscaProduto = await this.findOneById(produto.id);

        if (!buscaProduto || !produto.id)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        
        let buscaProduto = await this.findOneById(id);

        if (!buscaProduto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtoRepository.delete(id);

    }

    async findByNomeAndLaboratorio(nome: string, laboratorio:string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                nome: nome,
                laboratorio: laboratorio
            },
            relations: {
                categoria: true
            }
        })
    }

    async findByNomeOrLaboratorio(nome: string, laboratorio:string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: [
            {nome: nome},
            {laboratorio: laboratorio}
            ],
            relations: {
                categoria: true
            }
        })
    }

    async findByPrecoBetween(inicio: number, fim: number): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                preco: Between(
                    inicio,
                    fim
                )
            },
            relations: {
                categoria: true
            }
        })
    }

    async findByPrecoIn(preco: number[]): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                preco: In(preco)
            },
            relations: {
                categoria: true
            }
        })
    }

}
