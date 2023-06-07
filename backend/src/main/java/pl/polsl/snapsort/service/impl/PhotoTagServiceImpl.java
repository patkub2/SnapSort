package pl.polsl.snapsort.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.snapsort.repository.PhotoTagRepository;
import pl.polsl.snapsort.service.PhotoTagService;

@Service
public class PhotoTagServiceImpl implements PhotoTagService {
    private final PhotoTagRepository photoTagRepository;

    @Autowired
    public PhotoTagServiceImpl(PhotoTagRepository photoTagRepository) {
        this.photoTagRepository = photoTagRepository;
    }
}
