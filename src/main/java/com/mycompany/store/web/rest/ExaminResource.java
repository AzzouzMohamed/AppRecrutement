package com.mycompany.store.web.rest;

import com.mycompany.store.domain.Examin;
import com.mycompany.store.repository.ExaminRepository;
import com.mycompany.store.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.store.domain.Examin}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExaminResource {

    private final Logger log = LoggerFactory.getLogger(ExaminResource.class);

    private static final String ENTITY_NAME = "examin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExaminRepository examinRepository;

    public ExaminResource(ExaminRepository examinRepository) {
        this.examinRepository = examinRepository;
    }

    /**
     * {@code POST  /examins} : Create a new examin.
     *
     * @param examin the examin to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new examin, or with status {@code 400 (Bad Request)} if the examin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/examins")
    public ResponseEntity<Examin> createExamin(@Valid @RequestBody Examin examin) throws URISyntaxException {
        log.debug("REST request to save Examin : {}", examin);
        if (examin.getId() != null) {
            throw new BadRequestAlertException("A new examin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Examin result = examinRepository.save(examin);
        return ResponseEntity.created(new URI("/api/examins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /examins} : Updates an existing examin.
     *
     * @param examin the examin to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated examin,
     * or with status {@code 400 (Bad Request)} if the examin is not valid,
     * or with status {@code 500 (Internal Server Error)} if the examin couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/examins")
    public ResponseEntity<Examin> updateExamin(@Valid @RequestBody Examin examin) throws URISyntaxException {
        log.debug("REST request to update Examin : {}", examin);
        if (examin.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Examin result = examinRepository.save(examin);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, examin.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /examins} : get all the examins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of examins in body.
     */
    @GetMapping("/examins")
    public List<Examin> getAllExamins() {
        log.debug("REST request to get all Examins");
        return examinRepository.findAll();
    }

    /**
     * {@code GET  /examins/:id} : get the "id" examin.
     *
     * @param id the id of the examin to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the examin, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/examins/{id}")
    public ResponseEntity<Examin> getExamin(@PathVariable Long id) {
        log.debug("REST request to get Examin : {}", id);
        Optional<Examin> examin = examinRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(examin);
    }

    /**
     * {@code DELETE  /examins/:id} : delete the "id" examin.
     *
     * @param id the id of the examin to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/examins/{id}")
    public ResponseEntity<Void> deleteExamin(@PathVariable Long id) {
        log.debug("REST request to delete Examin : {}", id);
        examinRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
