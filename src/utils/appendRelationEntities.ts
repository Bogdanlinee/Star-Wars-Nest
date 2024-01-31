export const appendEntities = async (entity: any, dto: any, idList: any, entityList: any, repository: any) => {
    if (dto[idList]) {
        entity[entityList] = []
        for (const id of dto[idList]) {
            const result = await repository.findOne({where: {id}});
            if (result) entity[entityList].push(result)
        }
    }
}