import {Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, TableInheritance} from 'typeorm'

@Entity("users")
export  class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    email:string;
     @Column()
  nom: string;

  @Column()
  prenom: string;
    @Column()
    password: string;
    @Column({ nullable: true })
    telephone?: string;
    @Column({ nullable: true })
    adresse?: string;
    @CreateDateColumn()
    createdAt: Date;
    @Column({ default: 'seller' })
    role: 'seller' | 'courier';
    @Column({ nullable: true })
    profileImage?: string;
}