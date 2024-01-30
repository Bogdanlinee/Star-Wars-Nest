import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Vehicle} from './entities/vehicle.entity';
import {CreateVehiclesDto} from './dto/create-vehicle.dto';
import {UpdateVehicleDto} from './dto/update-vehicle.dto';
import {Person} from '../people/entities/person.entity';
import {Film} from '../films/entities/film.entity';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
    ) {
    }

    async create(createVehiclesDto: CreateVehiclesDto) {
        const vehicle = this.vehicleRepository.create(createVehiclesDto);

        vehicle.pilots = createVehiclesDto.pilotsIds.map(id => ({...new Person(), id}));
        vehicle.films = createVehiclesDto.filmsIds.map(id => ({...new Film(), id}));

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

        if (updateVehicleDto.filmsIds) {
            updatedVehicle.films = updateVehicleDto.filmsIds.map(id => ({...new Film(), id}));
        }

        if (updateVehicleDto.pilotsIds) {
            updatedVehicle.pilots = updateVehicleDto.pilotsIds.reduce((acc, id) => {

                return acc;
            }, [])

        }

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
