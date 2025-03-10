import tourProgramRepository from '../tourPrograms/repository';

export const getAllTourProgramsByReadyTourId = async (readyTourId: number) => {
    return await tourProgramRepository.getAllTourProgramsByReadyTourId(readyTourId)
}
