import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Vehicle} from './entities/vehicle.entity';
import {CreateVehiclesDto} from './dto/create-vehicle.dto';
import {UpdateVehicleDto} from './dto/update-vehicle.dto';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';
import {appendEntities} from '../utils/appendRelationEntities';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
        @InjectRepository(Person)
        private peopleRepository: Repository<Person>,
        @InjectRepository(Film)
        private filmsRepository: Repository<Film>,
    ) {
    }

    async create(createVehiclesDto: CreateVehiclesDto) {
        const vehicle = this.vehicleRepository.create(createVehiclesDto);

        await appendEntities(vehicle, createVehiclesDto, 'pilotsIds', 'pilots', this.peopleRepository);
        await appendEntities(vehicle, createVehiclesDto, 'filmsIds', 'films', this.filmsRepository);


        return this.vehicleRepository.save(vehicle);
    }

    async findAll() {
        return this.vehicleRepository.find({
            relations: {
                films: true,
                pilots: true,
            },
            relationLoadStrategy: 'query',
            order: {id: 'DESC'},
            take: 10,
        });
    }

    async findOne(id: number) {
        return await this.vehicleRepository.findOne({
            where: {id},
            relations: {
                films: true,
                pilots: true,
            },
            relationLoadStrategy: 'query',
        });
    }

    async update(id: number, updateVehicleDto: UpdateVehicleDto) {
        const vehicle = await this.findOne(id);

        if (!vehicle) throw new NotFoundException('No such vehicle!');

        const updatedVehicle = {...vehicle, ...updateVehicleDto};

        await appendEntities(updatedVehicle, updateVehicleDto, 'filmsIds', 'films', this.filmsRepository);
        await appendEntities(updatedVehicle, updateVehicleDto, 'pilotsIds', 'pilots', this.filmsRepository);

        return await this.vehicleRepository.save(updatedVehicle);
    }

    async remove(id: number) {
        const vehicle = await this.findOne(id);

        if (!vehicle) throw new NotFoundException('No such vehicle!');

        vehicle.deletedAt = new Date();
        await this.vehicleRepository.save(vehicle);

        return vehicle;
    }
}
